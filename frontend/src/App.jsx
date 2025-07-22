import { useState, useEffect, useCallback } from 'react'
import './App.css'

//reads the backend API URL from an environment variable
  const API_URL = import.meta.env.VITE_APP_API_URL; 

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  // const setTodosDependency = `${setTodos}` 

  const fetchedTodoList = useCallback(async ()=> {
        await fetch(`${API_URL}/todos`)  
          .then(res=> res.json())
          .then(data => setTodos(data))
          .catch( err => {
            console.log('couldn\'t fetch data from backend', err);
            // throw new Error('failed to fetch the existing todo list');
          })
          .finally(() => {
            if (todos) {
            setLoading(false)
          }
          }) 
  }, [setTodos])

  useEffect(() => {
    fetchedTodoList()
  }, [fetchedTodoList])
      
  console.log('todos array is', todos)
  

  const addTodoItem = () => {
    fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         //id is generated in the backend using the in-memory data
        text: input
      })
    }).then(response => {
      if(!response.ok) {
        console.log('error adding to todo list:', response.status )
        throw new Error(`HTTP error status: ${response.status}`)
      }
      return response.status(201).json()
    }).catch (err => {
      throw new Error('failed to create a todo', err)
    })
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

    {loading && todos ? <p> ...loading </p> : (
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
