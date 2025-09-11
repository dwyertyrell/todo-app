import React from "react";
import { render, waitFor } from "@testing-library/react";
import Notification from "./notification";
import '@testing-library/jest-dom'

describe('Notification component', () => {

  let onClose;
  let notification;
  
 beforeEach(()=>{  
  onClose = jest.fn()
  notification = render(<Notification message={'todo item updated'} type={'success'} onClose={onClose}/>)
  })

  test('shows success notification', async() => {
    const success = notification.container.querySelector('.notification.success');
    expect(success).toBeInTheDocument()

  //   await waitFor(() => {
  //     expect(success).not.toBeInTheDocument()
  //   }, {timeout: 4000}
  // )

  })

  test('shows error notification', () => {
    notification.rerender(<Notification message={'Todo item cannot be empty'} type ={'error'} onClose={onClose} autodismiss={3000}/>)
    const error = notification.container.querySelector('.notification.error');
    expect(error).toBeInTheDocument()
  })




})