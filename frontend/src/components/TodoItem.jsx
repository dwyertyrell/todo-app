import React, {useState} from 'react'
import Button from './common/button'

function TodoItem ({todo, onUpdate, onDelete, onToggleCompleted}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text)

  const handleEdit = (e) => {
    e.preventDefault();
    if(text.trim() !=='') {
      onUpdate(todo.id, text)
      setIsEditing(false)
      
    }
  }

// console.log(todo.createdAt)

  return (
    <li className ='todoItem' key ={todo.id}>
      {isEditing ? (
        <form onSubmit ={handleEdit}>
          <input
          value ={text}
          placeholder={todo.text}
          onChange = {e => setText(e.target.value)}
          />
           <Button variant='add' type ='submit'>Save</Button>
           <Button 
            variant='edit'
            type ='button' 
            onClick ={() => setIsEditing(false)}
            >cancel</Button> 
        </form>
      ) : (
        <div  style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <input
          type = 'checkbox'
          checked = {todo.completed}
          onChange= {()=> onToggleCompleted(todo.id)} // tracking the value of checked attribute- calling a fetch request from <App/> to update the database which re-renders the todo list with update
          // style= {{marginRight: '8px'}}
          ></input>
          <span
          style ={{ 
            textDecoration: todo.completed ? 'line-through': 'none',
            color: todo.completed ? 'grey': 'black'
          }}
          >{todo.text}</span> 
          <span>{todo.createdAt}</span>
          
          
          <Button variant = 'edit' onClick = {() => setIsEditing(true)}>Edit</Button>
          <Button variant = 'delete' onClick ={()=> onDelete(todo.id)}>Delete</Button>
        </div>
      )}
    
    </li>
  )
}

export default TodoItem