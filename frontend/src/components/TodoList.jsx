import React, {useState} from 'react'
import TodoItem from './TodoItem'

function TodoList ({todos, onUpdate, onDelete}) {

  if(todos.length === 0) { return <p>there are no todo items yet.</p>}
  return (
      <ul>
        {todos.map((todo)=> {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate= {onUpdate}
              onDelete={onDelete}
              />
          )
        })}
      </ul>
    
  )
}
export default TodoList