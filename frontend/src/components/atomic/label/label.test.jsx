import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'
import Label from "./label";


describe('Label component', () => {
  let label;

  beforeEach(() => {
    label = render(<Label> sort by:</Label>)
  })
  test('label element to be rendered', () => {
    const labelDOM = label.getByText('sort by:')
    expect(labelDOM).toBeInTheDocument()
  })
})