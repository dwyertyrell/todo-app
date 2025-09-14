import React, {useState} from "react";
import '@testing-library/jest-dom'
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Notification from "../../../src/components/atomic/notification/notification";
import TodoList from "../../../src/components/organisms/todoList";

//simulating a stateful environment for testing
function TestWrapper() {

  const [todos, setTodos] = useState([{ id: 1, text: 'wash the bath', completed: false, }])
  const [notifyMessage, setNotifyMessage] = useState('')
  const [notifyType, setNotifyType] = useState('')


  const handleUpdate = (id, newText) => {
    setTodos(todos => {
      return (
        todos.map(todo => todo.id === id ? {...todo, text: newText} : todo)
      )
    })
    }
  const handleNotify = (msg, type) => {
    setNotifyMessage(msg)
    setNotifyType(type)
    }
  const onClose = () => {
    setNotifyMessage('')
    setNotifyType('')
  }
  return (
    <>
      <TodoList todos={todos} onUpdate={handleUpdate} onDelete={() => {}} onToggleCompleted={() => {}} notify= {handleNotify}/>

      <Notification message={notifyMessage} type={notifyType} onClose={onClose} />
    </>
  )
}


describe('Editing a todo- client side validation', () => {

  let view;

  beforeEach(() => {
    view = render(<TestWrapper/>)
  })

  test('user edits and updates a todo item in list', async() => {
    
    const editButton = view.queryByRole('button', {name: 'Edit'})
    await userEvent.click(editButton)
    const item = view.container.querySelector('.todoItem')
    const textbox = within(item).getByDisplayValue('wash the bath') 
    expect(textbox).toBeInTheDocument()
    await userEvent.clear(textbox)
    await userEvent.type(textbox, 'go to sleep')
    const saveButton = view.queryByRole('button', {name: 'Save'})
    await userEvent.click(saveButton)

    const confirmModal = view.container.querySelector('.modal-overlay')
    expect(confirmModal).toBeInTheDocument()
    const confirmButton = within(confirmModal).getByRole('button', {name:'Confirm'})
    expect(confirmButton).toBeInTheDocument()
    await userEvent.click(confirmButton)
    const newText = view.getByText('go to sleep')
    await waitFor(() => {
    expect(newText).toBeInTheDocument()
    })
    view.debug()
    await waitFor(() => {
      expect(confirmModal).not.toBeInTheDocument()
    })
    const notification = view.container.querySelector('.notification.success')
    await waitFor(() => {
    expect(notification).toBeInTheDocument()
    })
  })
})

// describe('User cancels editing; the todo returns to its previous state', () => {

// })



