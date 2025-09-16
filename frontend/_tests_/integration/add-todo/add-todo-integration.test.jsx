import React from "react";
import '@testing-library/jest-dom'
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddTodoForm from "../../../src/components/molecules/addTodoForm/addTodoForm";
import Notification from "../../../src/components/atomic/notification/notification";

describe('Adding a todo- client side validation', () => {
  let todos;
  let addTodoForm;
  let input;
  let button;

  let onAdd;
  let notify

  let notification;
  let onClose;

  beforeEach(() => {
    todos = [];
    onAdd = jest.fn()
    notify= jest.fn()
    onClose = jest.fn()
  
    addTodoForm = render(<AddTodoForm onAdd={onAdd} notify={notify} todos={todos}/>)
    input = addTodoForm.queryByRole('textbox')
    button = addTodoForm.queryByRole('button', {name: 'Add'})

  })

  test('User enters a valid todo item', async() => {
    notification = render(<Notification message={'item added to list'} type={'success'} onClose={onClose}/>)
    const successNotify= notification.container.querySelector('.notification.success')

    await userEvent.type(input, 'buy milk')
    await userEvent.click(button)
    expect(onAdd).toHaveBeenCalledWith('buy milk')
    expect(notify).toHaveBeenCalledWith('todo item added to list!', 'success')
    //need to wait for the notification dialog to appear, using waitFor()
    await waitFor(() => {
      expect(successNotify).toBeInTheDocument()
    })
  })

  test('User submits the form with an empty input', async() => {
    notification = render(<Notification message={'todo item cannot be empty'} type={'error'} onClose={onClose}/>)
    const errorNotify= notification.container.querySelector('.notification.error')

    await userEvent.type(input, ' ')
    await userEvent.click(button)

    expect(onAdd).not.toHaveBeenCalledWith(' ')
    expect(notify).toHaveBeenCalledWith('todo item cannot be empty', 'error')
  
    await waitFor(() => {
      expect(errorNotify).toBeInTheDocument()
    })
  })

  test('User submit a form with of a duplicate todo item', async() => {
    todos = [{text: 'buy milk'}]
    addTodoForm.rerender(<AddTodoForm onAdd={onAdd} notify={notify} todos={todos}/>)
    notification = render(<Notification message={'duplicated todo items are not allowed'} type={'error'} onClose={onClose}/>)
    const errorNotify = notification.container.querySelector('.notification.error')
    await userEvent.type(input, 'buy milk')
    await userEvent.click(button)

    expect(onAdd).not.toHaveBeenCalled()
    expect(notify).toHaveBeenCalledWith('duplicated todo items are not allowed', 'error')

    await waitFor(() => {
      expect(errorNotify).toBeInTheDocument()
    })
  })

})





