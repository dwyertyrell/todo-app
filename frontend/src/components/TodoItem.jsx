import React, {useState} from 'react'

function TodoItem ({todo, onUpdate, onDelete}) {
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
        <>
          <span> {todo.text}</span>  {/*use the initial text value from the todo prop*/}
          <button onClick = {() => setIsEditing(true)}>Edit</button>
          <button onClick ={()=> onDelete(todo.id)}>Delete</button>
        </>
      )}
    
    </li>
  )
}

export default TodoItem