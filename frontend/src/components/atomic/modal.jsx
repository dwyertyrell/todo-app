import React from "react";
import Button from "./button/button";
import Text from "./text";
//props passed into this modal is entirely passed on which parent component the instance of <Modal> is being created with
const Modal = ({isOpen, onConfirm, onCancel, title, message}) => {

  if (!isOpen) return null 



  return (
    <>
      <div className='modal-overlay'>
        <div className='modal'>

          <Text size ='lg'>{title}</Text><br/>
          <Text >{message}</Text>

          <div className='modal-actions'>
            <Button onClick={onConfirm}>Confirm</Button>
            <Button onClick={onCancel}>Cancel</Button>
          </div>
      
        </div>

      </div>
    </>
  )
}

export default Modal 