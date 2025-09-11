import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'
import Button from "./button";
import userEvent from "@testing-library/user-event";

describe('Button component', () => {

  let button;
  let onClick

  beforeEach(() => {
    onClick = jest.fn()
    button = render(<Button></Button>)
  })

  test('button is rendered with the correct "Edit" label', () => {
    button.rerender(<Button variant= 'edit' onClick={onClick}>Edit</Button>)
    const edit = button.getByText('Edit')
    expect(edit).toBeInTheDocument()
  })

   test('button is rendered with the correct "Delete"label', () => {
    button.rerender(<Button variant= 'delete' onClick={onClick}>Delete</Button>)
    const deleteButton = button.getByText('Delete')
    button.debug()
    expect(deleteButton).toBeInTheDocument()
  })

  test('calls callback when click', async() => {
    button.rerender(<Button variant ='delete' onClick={onClick}>Delete</Button>)
    const deleteButton= button.getByText('Delete')
    await userEvent.click(deleteButton)
    expect(onClick).toHaveBeenCalled()
  })

})