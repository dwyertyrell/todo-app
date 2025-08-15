import { useState, useEffect, useCallback } from 'react'
import './App.css'
import AddTodoForm from './components/AddTodoForm'
import TodoList from './components/TodoList'
//reads the backend API URL from an environment variable
  const API_URL = import.meta.env.VITE_APP_API_URL; 

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const toggleCompleted = async(id) => {
    setError('')
    try {
      const response = await fetch(`${API_URL}/todos/${id}/completed`, {
        method: 'PUT'
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
  const deleteTodo = async (id) => {
    setError('');
    try{
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
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



return (
<>
  <div className='container'>
    <h1> To Do List</h1>

    <AddTodoForm 
    onAdd={addTodoItem}
    
    />

    {error && <p style = {{color:'red'}}>{error}</p>}

    {loading ? <p>Loading...</p> : (
     <TodoList 
      todos ={todos} 
      onUpdate = {updateTodo} 
      onDelete ={deleteTodo} 
      onToggleCompleted = {toggleCompleted}
     />
    )}
  </div>
  
</>

  )
}

export default App
