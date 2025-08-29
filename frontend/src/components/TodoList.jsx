import React from 'react'
import TodoItem from './todoItem'

function TodoList ({todos, onUpdate, onDelete, onToggleCompleted}) {
  // const safeTodos = Array.isArray(todos) ? todos : []
  if(todos.length === 0) { return <p>there are no todo items yet.</p>}
  return (
      <ul>
        {/*safeTodos*/todos.map((todo)=> {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate= {onUpdate}
              onDelete={onDelete}
              onToggleCompleted = {onToggleCompleted}
              />
          )
        })}
      </ul>
    
  )
}
export default TodoList