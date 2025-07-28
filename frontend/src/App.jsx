import { useState, useEffect, useCallback } from 'react'
import './App.css'

//reads the backend API URL from an environment variable
  const API_URL = import.meta.env.VITE_APP_API_URL; 

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchedTodoList = useCallback(async ()=> {
        try {
          const response = await fetch(`${API_URL}/todos`);
          const data = await response.json();
          setTodos(data);
          console.log('todos updated with fresh data:', data); // Log the fresh data here
        } catch (err) {
          console.log('couldn\'t fetch data from backend', err);
        } finally {
          setLoading(false);
        }
  }, []) // Empty dependency array since API_URL is a constant

  useEffect(() => {
    fetchedTodoList()
  }, [fetchedTodoList]) // Remove todos dependency to prevent infinite loop
      
  

  const addTodoItem = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    if (!input.trim()) return; // Don't add empty todos and exit this function
    
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: input
        })
      });
      
      if (!response.ok) {
        console.log('error adding to todo list:', response.status);
        throw new Error(`HTTP error status: ${response.status}`);
      }
      
      // After successfully adding, refetch the todo list and clear input
      await fetchedTodoList();
      setInput(''); //clear input space
      
    } catch (err) {
      console.error('failed to create a todo:', err);
    }

  }

return (
<>
  <div className='container'>
    <h1> To Do List</h1>

    <form onSubmit={addTodoItem}>
      <input
        value = {input}
        onChange = {e => setInput(e.target.value)}
        placeholder= 'add a new task'
      ></input>
      <button type = 'submit' >Add</button>
    </form>

    {loading ? <p>Loading...</p> : (
      <ul>
        {todos.map((todo)=>{
          return <li key={todo.id}>{todo.text}</li>
        })}
      </ul>
    )}
  </div>
  
</>

  )
}

export default App
