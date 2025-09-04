import { useState, useEffect, useCallback } from 'react'
import './App.css'
import AddTodoForm from './components/molecules/addTodoForm'
import TodoList from './components/organisms/todoList'
import Button from './components/atomic/button';
import Text from './components/atomic/text';
import SortTodoList from './components/molecules/sortTodoList';
import BulkActions from './components/molecules/bulkActions';
import Notification from './components/atomic/notification';
import {ClipLoader} from 'react-spinners'
//reads the backend API URL from an environment variable
  const API_URL = import.meta.env.VITE_APP_API_URL; 

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('date')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({message:'', type: ''})

  const fetchedTodos = useCallback(async ()=> {
        try {
          const response = await fetch(`${API_URL}/todos`);
          const responseJSON = await response.json(); 
          const data = responseJSON.data
          setTodos(data);
          console.log('todos updated with fresh data:', data); // Log the fresh data here
        } catch (err) {
          console.log('couldn\'t fetch data from backend', err);
        } finally {
          setLoading(false);
        }
  }, []) // Empty dependency array since API_URL is a constant

  useEffect(() => {
    fetchedTodos()
  }, [fetchedTodos]) // Remove todos dependency to prevent infinite loop
      
  // filter the todo list
  const filterTodos = todos.filter( todo => { 
    if (filter === 'completed') return todo.completed
    if (filter === 'active') return !todo.completed
    return true 
    
  })

  const notify = (msg, type = 'info') => {
    setNotification({message: msg, type: type});
    // setTimeout(() => setNotification({message: '', type: ''}), 3000)
  }

  //renders another instance of the array on component- in order to not mutate the current array in state
  const sortedTodos = [...filterTodos].sort((a,b) => {
    if (sort === `date`) return new Date(a.createdAt) - new Date(b.createdAt)
    if (sort === `alpha`) return a.text.localeCompare(b.text)
    return 0;
  })

  // add a todo item to list
  const addTodoItem = async (text) => {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({text})
      });
      
      if (!response.ok) {
        console.log('error adding to todo list:', response.status);
        throw new Error(`HTTP error status: ${response.status}`);
      }
      
      const responseJSON = await response.json()
      const newTodo = responseJSON.data
      setTodos(prevTodos => [...prevTodos, newTodo]);
      
      // Optionally refetch todos to ensure synchronization
      await fetchedTodos();
    } catch (err) {
      console.error('failed to create a todo:', err.message);
    }
  }
  //update the text of a todo item
  const updateTodo = async (id, text) => {
    setError('');
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text}) //the controller expects an object propery with string type  
      });

      if(!response.ok) {
        throw new Error('failed to update todo item')
      };

      const responseJSON = await response.json() 
      const updatedTodo = responseJSON.data
      setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? updatedTodo : todo)) // due to javascript closure behaviour, we must manually update state
      await fetchedTodos()
    }catch (err) {
      setError(err.message)
    }
  }
  // toggle a todo item  
  const toggleCompleted = async(id) => {
    setError('')
    try {
      const response = await fetch(`${API_URL}/todos/${id}/completed`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) throw new Error('failed to toggle completed')
        const repsonseJSON = await response.json()
      const updatedTodo = repsonseJSON.data
      setTodos(
      todos.map((prevTodo) => prevTodo.id === id ? updatedTodo : prevTodo)
      )
      await fetchedTodos()
    }catch(err){
      setError(err)
    }    
  }
  // delete a todo item
  const deleteTodo = async (id) => {
    setError('');
    try{
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(!response.ok){
        throw new Error('failed to delete todo')
      }
      await response.json()
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id)) // due to javascript closure behaviour, we must manually update state
      await fetchedTodos()
    }catch(err){
      setError(err.message)
    }
  }

  // delete all the todo items
  const deleteAllTodos = async () => {
    setError('')
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(!response.ok) throw new Error('failed to delete the todo list')
      
      await response.json()
      setTodos([])
      console.log('bulk delete called')
      await fetchedTodos()
    } catch(err) {
      setError(err.message)
      console.error( `request failed:`, err.message)
    }
  }

  const completeAllTodos = async () => {
    setError('')
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if(!response.ok) throw new Error('failed to complete all todos')
      
      await response.json()
      await fetchedTodos()
      // console.log(response)

    } catch(err) {
      setError(err.message)
    }
  }

return (
<>
  <Notification //a global UI component; must only be controlled through central component
    message={notification.message}
    type={notification.type}
    onClose= {()=> setNotification({message:'', type:''})}
    />

  <div className='container'>

    <Text size='lg' >To Do List</Text>
    
    <AddTodoForm 
    onAdd={addTodoItem}
    notify={notify}
    todos={todos}
    />

  {error && <Text style = {{color:'red'}}>{error}</Text>} 
    
    
    {/* modularized the sort functionality as a molecule compoenent */}
  <SortTodoList setFilter={setFilter} sort={sort} setSort={setSort}/>

{/* modularized the buld API request actions as a molecule component   */}
  <BulkActions 
    deleteAllTodos={deleteAllTodos} 
    completeAllTodos={completeAllTodos}
  />

      
    {loading ? <ClipLoader/> : (
     <TodoList 
      todos ={sortedTodos} //replaced value with {filterTodos}, as {sortedTodos} is simply an instance of {filterTodos}
      onUpdate = {updateTodo} 
      onDelete ={deleteTodo} 
      onToggleCompleted = {toggleCompleted}
      onFilterTodos = {filterTodos}
      notify={notify}
     />
    )}
  </div>
  
</>
)
}

export default App
