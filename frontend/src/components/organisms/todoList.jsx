import React from 'react'
import TodoItem from './todoItem'

function TodoList ({todos, onUpdate, onDelete, onToggleCompleted, notify}) {
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
              onToggleCompleted = {onToggleCompleted}
              notify={notify}
              />
          )
        })}
      </ul>
    
  )
}
export default TodoList