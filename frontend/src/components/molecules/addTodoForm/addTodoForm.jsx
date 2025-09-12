import React, {useState} from "react";
import Button from "../button/button";
import Input from "../atomic/input";

function AddTodoForm ({onAdd, notify, todos}) {
  const [text, setText] = useState('');

  const trimmedTexted = text.trim()
    
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission reload
    if (trimmedTexted === '') {
      return notify('todo item cannot be empty', 'error')
    }
    if ( todos.some((todo)=> todo.text === trimmedTexted)) {
      return notify('duplicated todo items are not allowed', 'error')
    }
    
    if (typeof trimmedTexted !== "string" || /^\d+$/.test(trimmedTexted)) {
      return notify('text must only be words and/or letters', 'error')
    }
    onAdd(trimmedTexted) //passing the user input into <App/>
    setText('')
    notify('todo item added to list!', 'success')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value = {text}
        onChange = {e => setText(e.target.value)}
        placeholder= 'add a new task'
      ></Input>
      <Button variant='add' type = 'submit' >Add</Button>
    </form>
  )
}
export default AddTodoForm 