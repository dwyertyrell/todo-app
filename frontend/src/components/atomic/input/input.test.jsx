import React from "react";
import Input from './input'
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'

{/* <Input
        value = {text}
        onChange = {e => setText(e.target.value)}
        placeholder= 'add a new task'
      ></Input> */}
describe('Input component', () => {
  let input;

  beforeEach(() => {
    input =render(<Input placeholder='add a new task'/>)  
  })

  test('Input to be rendered in document', () => {

    const inputDOM = input.getByPlaceholderText('add a new task')
    expect(inputDOM).toBeInTheDocument()
  })
})
