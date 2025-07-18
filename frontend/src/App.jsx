import { useState, useEffect } from 'react'
import './App.css'

//reads the backend API URL from an environment variable
  const API_URL = null // import.meta.env.VITE_APP_API_URL; 

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  const setTodosDependency = `${setTodos}` 

  // useEffect(() => {
  //   fetch(`${API_URL/todos}`)
  //   .then(res => res.json())
  //   //this works because .then expects a function that takes the result of the previous promise. 
  //   // alternative way- .then(res => setTodos(res) )
  //   //.then(setTodos(res) is wrong as it calls the setter function immmediately, before the promise is resovled)
  //   .then(setTodos)
  // }, [setTodosDependency])
console.log('hello world')
  return (
<>
  <div className='container'>
    <h1> To Do List</h1>
    <form onSubmit={() => {}}>
      <input
        value = {input}
        onChange = {e => setInput(e.target.value)}
        placeholder= 'add a new task'
      ></input>
      <button type = 'submit'>Add</button>
    </form>

    {loading ? <p> ...loading </p> : (
      <ul>
        {todos.map((todo)=>{
          <li key={todo.id}>{todo.text}</li>
        })}
      </ul>
    )}
  </div>
  
</>

  )
}

export default App
