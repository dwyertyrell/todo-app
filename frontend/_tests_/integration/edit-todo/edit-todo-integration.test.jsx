import React, {useState} from "react";
import '@testing-library/jest-dom'
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Notification from "../../../src/components/atomic/notification/notification";
import TodoList from "../../../src/components/organisms/todoList";
import BulkActions from "../../../src/components/molecules/bulkActions";

//Simulating a stateful environment for testing
function TestWrapper() {

  const [todos, setTodos] = useState([{ id: 1, text: 'wash the bath', completed: false, }, { id: 2, text: 'watch anime', completed: false, }])
  const [notifyMessage, setNotifyMessage] = useState(' ')
  const [notifyType, setNotifyType] = useState(' ')

  const handleComplete = (id) => {
    setTodos(
      todos.map(todo => todo.id === id ? !todo.completed : todo.completed )
    )
  }

  const handleCompleteAll = () => {
    setTodos((todos) => {
      return (
      todos.map(todo => !todo.completed ? {...todo, completed: true} : {...todo})
      )
    })
  
    }

  const handleUpdate = (id, newText) => {
    setTodos(todos => {
      return (
        todos.map(todo => todo.id === id ? {...todo, text: newText} : todo)
      )})
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
      <BulkActions deleteAllTodos={()=>{}} completeAllTodos={handleCompleteAll} />

      <TodoList todos={todos} onUpdate={handleUpdate} onDelete={() => {}} onToggleCompleted={handleComplete} notify= {handleNotify}/>
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
    const todoItem = view.container.querySelector('[data-testid="1"]')
    const editButton = within(todoItem).queryByRole('button', {name: 'Edit'})
    await userEvent.click(editButton)
    const textbox = within(todoItem).getByDisplayValue('wash the bath') 
    expect(textbox).toBeInTheDocument()
    await userEvent.clear(textbox)
    await userEvent.type(textbox, 'go to sleep')
    const saveButton = within(todoItem).queryByRole('button', {name: 'Save'})
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
    // use the afterEach() test function to render the <Notification/> 's props with empty string values
    const closeButton = within(notification).getByRole('button')
    await userEvent.click(closeButton)
    await waitFor(() => {
      expect(notification).not.toBeInTheDocument()
    })
  })

//did i test the notification modal in this case?
  test('User cancels editing; the todo returns to its previous state', async() => {
    const todoItem = view.container.querySelector('[data-testid="1"]')
    const editButton = within(todoItem).queryByRole('button', {name: 'Edit'})
    await userEvent.click(editButton)
    const textbox = within(todoItem).getByRole('textbox')
    expect(textbox).toBeInTheDocument()
    const cancelButton = within(todoItem).getByRole('button', {name: 'Cancel'})
    expect(cancelButton).toBeInTheDocument()
    await userEvent.click(cancelButton)
    await waitFor(() => {
      expect(textbox).not.toBeInTheDocument()
    })
  })

  /*  needed to replace dummy callback in the onToggleCompleted prop
  with a real handler that manages a piece of state, to allow for state change in the component; 
  simulating the user click event
  */ 

  test('User marks a todo item as "complete"', async() => {
    const todoItem = view.container.querySelector('[data-testid="2"]')
    const checkbox = within(todoItem).getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
    await userEvent.click(checkbox)
    await waitFor(() => {
      expect(checkbox).toBeChecked()
    })
  })

  // check test- falsey positive 
  test('User marks all todo items as completed', async() => {
    const completeAllButton = view.getByRole('button', {name: 'Complete All'})
    expect(completeAllButton).toBeInTheDocument()
    await userEvent.click(completeAllButton)
    const confirmButton = view.getByRole('button', {name: 'Confirm'})
    expect(confirmButton).toBeInTheDocument()
    await userEvent.click(confirmButton)
    const todoItem1 = view.container.querySelector('[data-testid="1"]')
    const todoItem2 = view.container.querySelector('[data-testid="2"]')
    const checkbox1 = within(todoItem1).getByRole('checkbox')
    const checkbox2 = within(todoItem2).getByRole('checkbox')
    expect(checkbox1).toBeInTheDocument()
    expect(checkbox2).toBeInTheDocument()
    await waitFor(() => {
      expect(checkbox1).toBeChecked()
      expect(checkbox2).toBeChecked()
    })
  })

  
})





