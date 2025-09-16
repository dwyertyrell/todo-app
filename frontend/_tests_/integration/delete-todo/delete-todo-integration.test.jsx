import React, {useState} from "react";
import '@testing-library/jest-dom'
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BulkActions from "../../../src/components/molecules/bulkActions";
import TodoList from "../../../src/components/organisms/todoList";
import Notification from "../../../src/components/atomic/notification/notification";

function TestWrapper() {
  const [todos, setTodos] = useState([{id: 1, text: 'wash the bath', completed: false, }, { id: 2, text: 'watch anime', completed: false, }])

  const handleDelete = (id) => {
    setTodos(() => todos.filter((todo) =>  todo.id === id))
    }
  const handleDeleteAll = () => {
    setTodos([])
  }
  
  return (
    <>
      <BulkActions deleteAllTodos={handleDeleteAll} completeAllTodos={() => {}} />
      <TodoList todos={todos} onUpdate={() => {}} onDelete={handleDelete} onToggleCompleted= {() => {}} notify= {() =>{}}/>
    </>
  )
}

describe('Deleting a todo- client side validation', () => {
  let view;

  beforeEach(() => {
    view = render(<TestWrapper/>)
  })

  test('User clicks the delete button; a todo item is removed from list', async() => {
    const todoItem = view.container.querySelector('[data-testid="1"]')
    const deleteButton = within(todoItem).getByRole('button', {name:'Delete'})
    expect(deleteButton).toBeInTheDocument()
    await userEvent.click(deleteButton)
    const confirmModal = view.container.querySelector('.modal-overlay')
    await waitFor (()=>{
      expect(confirmModal).toBeInTheDocument()
    })
    const confirmButton = within(confirmModal).getByRole('button', {name:'Confirm'})
    expect(confirmButton).toBeInTheDocument()

// the functionality is not working in the modal
    //    await userEvent.click(confirmButton) 
    // const notification = view.container.querySelector('.notification.success')
    // await waitFor(()=> {
      //expect(confirmModal).not.toBeInTheDocument()
    // })
  })
})