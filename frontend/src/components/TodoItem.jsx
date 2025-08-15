import React, {useState} from 'react'

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



  return (
    <li className ='todoItem' key ={todo.id}>
      {isEditing ? (
        <form onSubmit ={handleEdit}>
          <input
          value ={text}
          placeholder={todo.text}
          onChange = {e => setText(e.target.value)}
          />
           <button type ='submit'>Save</button>
           <button 
            type ='button' 
            onClick ={() => setIsEditing(false)}
            >cancel</button> 
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
          
          
          <button onClick = {() => setIsEditing(true)}>Edit</button>
          <button onClick ={()=> onDelete(todo.id)}>Delete</button>
        </div>
      )}
    
    </li>
  )
}

export default TodoItem