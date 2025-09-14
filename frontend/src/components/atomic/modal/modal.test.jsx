import React from "react";
import '@testing-library/jest-dom'
import { render } from "@testing-library/react";
import Modal from "./modal";
import userEvent from "@testing-library/user-event";

/*  <Modal 
        isOpen={showDeleteModal} 
        title='Delete todo item?'
        message='Are you sure you want to delete this todo?'
        onConfirm={
          () => {
            onDelete(todo.id)
            notify( `todo item deleted: "${todo.text}"`, 'success')  
          }
        }
        onCancel={()=>{setShowDeleteModal(false)}}
      />*/ 
describe('Modal component', () => {

  let modal;
  let onConfirm;
  let onCancel;

  beforeEach(() => {
    onCancel = jest.fn()
    onConfirm = jest.fn()
    modal = render(<Modal isOpen={true} title={'Delete todo item?'} message={''} onConfirm= {onConfirm} onCancel= {onCancel}/>)
  })

  test('renders modal when open ',  () => {
    const title = modal.getByText('Delete todo item?')
    expect(title).toBeInTheDocument()
  })

  test('modal calls onCancel, when the "Cancel" button is clicked', async() => {
    const button = modal.getByRole('button', {name: 'Cancel'})
    await userEvent.click(button)
    expect(onCancel).toHaveBeenCalled()
  })

  test('modal calls onConfirm when the "Confirm" button is clicked', async() => {
    const button = modal.getByRole('button', {name: 'Confirm'})
    await userEvent.click(button)
    expect(onConfirm).toHaveBeenCalled() 
  })
})