import React, {useState} from "react";
import Button from "../atomic/button";

function AddTodoForm ({onAdd}) {
  const [text, setText] = useState('');

const handleSubmit = (e) => {
   e.preventDefault(); // Prevent form submission reload
   if (text.trim() === '') return; // Don't add empty todos and exit this function
  onAdd(text) //passing the user input into <App/>
  setText('')
}

  return (
    <form onSubmit={handleSubmit}>
      <input
        value = {text}
        onChange = {e => setText(e.target.value)}
        placeholder= 'add a new task'
      ></input>
      <Button variant='add' type = 'submit' >Add</Button>
    </form>
  )
}

export default AddTodoForm 