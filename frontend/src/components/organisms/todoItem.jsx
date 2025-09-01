import React, {useState} from 'react'
import Button from '../atomic/button'
import Modal from '../atomic/modal';


function TodoItem ({todo, onUpdate, onDelete, onToggleCompleted, notify}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)



  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowEditModal(true)
  }

  const handleConfirmSaveEdit = () => {
    if(text.trim() =='') {
      notify('Todo item cannot be empty', 'error')
    } else {
      onUpdate(todo.id, text)
      setIsEditing(false)
      notify('todo item updated', 'success')
    }
    setShowEditModal(false)
  }

  const handleCancelEdit = () => {
    setShowEditModal(false)
    setIsEditing(false)
  }

  return (
    <li className ='todoItem' key ={todo.id}>
      {isEditing && !showDeleteModal ? (
        //how do i implement the modal logic inbetween the form submission and its click event, for editing a todo? 
        // let onSubmit showEditModal to true, add the handleEdit click event to the onConfirm prop in the modal 
        <>
        <form onSubmit ={handleFormSubmit}>
          <input
          value ={text}
          placeholder={todo.text}
          onChange = {e => setText(e.target.value)}
          />
          { isEditing && !showEditModal && (
          <>
          <Button variant='add' type ='submit'>Save</Button>
          <Button 
          variant='delete'
          type ='button' 
          onClick ={() => setIsEditing(false)}
          >cancel</Button> 
          </>
          )}
        </form>
        <Modal
        isOpen={showEditModal}
        onConfirm={handleConfirmSaveEdit}
        onCancel={handleCancelEdit}
        title='save changes?'
        message='are you sure you want to edit changes?'
        />
        
        </>
        

      ) : (
        <div  style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <input
          type = 'checkbox'
          checked = {todo.completed}
          onChange= {()=> onToggleCompleted(todo.id)} // tracking the value of checked attribute- calling a fetch request from <App/> to update the database which re-renders the todo list with update
          ></input>
          <span
          style ={{ 
            textDecoration: todo.completed ? 'line-through': 'none',
            color: todo.completed ? 'grey': 'black'
          }}
          >{todo.text}</span> 
          <span>{todo.createdAt}</span>
          
          
          <Button variant = 'edit' onClick = {() => setIsEditing(true)}>Edit</Button>
          <Button variant = 'delete' onClick ={()=> setShowDeleteModal(true)/*onDelete(todo.id)*/}>Delete</Button>
        </div>
      )}

      <Modal 
        isOpen={showDeleteModal} 
        title='Delete todo item?'
        message='Are you sure you want to delete this todo?'
        onConfirm={
          () => {
            onDelete(todo.id)
            notify( `todo item deleted: "${todo.text}"`, 'success')  
          }
        }
        onCancel={()=>{setShowDeleteModal(false)}}
      />
    </li>
  )
}

export default TodoItem