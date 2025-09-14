// client-side layer unit testing
import React from "react";
import '@testing-library/jest-dom'
import AddTodoForm from "./addTodoForm";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";

describe('AddTodoForm Component', () => {
    
    let onAdd;
    let notify;
    let addTodoForm
    let input;
    let button;

  beforeEach(() => {
    onAdd = jest.fn()
    notify= jest.fn()
    addTodoForm = render(<AddTodoForm onAdd={onAdd} notify={notify} todos={[]}/>)
    input = addTodoForm.queryByRole('textbox')
    button = addTodoForm.queryByRole('button')
  })

  test('should add valid todo', async () => {
    await userEvent.type(input, 'walk dog home')
    await userEvent.click(button)
    expect(onAdd).toHaveBeenCalledWith('walk dog home')
    expect(notify).toHaveBeenCalledWith('todo item added to list!', 'success')
  })

  test('should not add empty todo', async () => {
    addTodoForm.rerender(<AddTodoForm onAdd={onAdd} notify={notify} todos={[{text: 'buy milk'}]}/>)

    await userEvent.type(input, ' ')
    await userEvent.click(button)
    expect(onAdd).not.toHaveBeenCalledWith(' ')
    expect(notify).toHaveBeenCalledWith('todo item cannot be empty', 'error')
  })

  test('should not add a duplicated todo', async() => {
    addTodoForm.rerender(<AddTodoForm onAdd={onAdd} notify={notify} todos={[{text: 'buy milk'}]}/>)

    await userEvent.type(input, 'buy milk')
    await userEvent.click(button)
    expect(onAdd).not.toHaveBeenCalledWith('buy milk')
    expect(notify).toHaveBeenCalledWith('duplicated todo items are not allowed', 'error')
  })
})