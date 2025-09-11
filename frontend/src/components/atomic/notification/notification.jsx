import React from "react";
import Button from "../button/button";

const Notification = ({message, type, onClose}) => {

  if (!message) return null

  return (
    <div className= {`notification ${type}`}>
      {message}
      <Button onClick={onClose}> &times; </Button>
    </div>
  )
}
export default Notification 

