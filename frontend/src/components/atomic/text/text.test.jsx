import React from "react";
import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import Text from "./text";

    // <Text size='lg' >To Do List</Text>

describe('Text component', () => {
  let text;
  
  beforeEach(() => {
    text = render(<Text size={'lg'}> To do list</Text>)
  })

  test('expect text to be in document', () => {
    const children = text.getByText('To do list')
    expect(children).toBeInTheDocument()
  })
})