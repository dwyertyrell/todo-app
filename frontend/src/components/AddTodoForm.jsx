import React, {useState} from "react";


function AddTodoForm ({onAdd}) {
  const [text, setText] = useState('');

const handleSubmit = (e) => {
   e.preventDefault(); // Prevent form submission reload
   if (text.trim() === '') return; // Don't add empty todos and exit this function
  onAdd(text) //passing the user input into <App/>
}

  return (
    <form onSubmit={handleSubmit}>
      <input
        value = {text}
        onChange = {e => setText(e.target.value)}
        placeholder= 'add a new task'
      ></input>
      <button type = 'submit' >Add</button>
    </form>
  )
}

export default AddTodoForm 