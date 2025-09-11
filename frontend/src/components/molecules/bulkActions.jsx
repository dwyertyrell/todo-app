import React, {useState} from "react";
import Button from "../atomic/button/button";
import Modal from "../atomic/modal";

const BulkActions = ({deleteAllTodos, completeAllTodos}) => {

const [showClearAllModal, setShowClearAllModal] = useState(false) //there must be a way to make the modal more dynamic- since it takes a piece of state every time a parent component makes an instance.
const [showCompletedAllModal, setShowCompletedAllModal] = useState(false)

return (
<>
    <div>
      <Button variant='delete' 
      onClick= {()=> {
        setShowClearAllModal(true)
        setShowCompletedAllModal(false)
      }
      }>Delete All</Button>
      <Button 
      onClick={()=> {
        setShowCompletedAllModal(true) 
        setShowClearAllModal(false)
      }
      }> Complete all</Button>
    </div>

    
    {showClearAllModal && !showCompletedAllModal? (
      <Modal 
        isOpen={showClearAllModal}
        title='Clear All?'
        message='Are you sure you want to clear all items in todo list?'
        onConfirm={() => {
          deleteAllTodos()
          setShowClearAllModal(false)
        }}
        onCancel={() => {setShowClearAllModal(false)}}
      /> ) : (
      showCompletedAllModal && !showClearAllModal ? (
        <Modal 
        isOpen={showCompletedAllModal}
        title='Complete All?'
        message='Are you sure you want to mark all todo items as complete?'
        onConfirm={()=> {
          completeAllTodos()
          setShowCompletedAllModal(false)
        }}
        onCancel={() => setShowCompletedAllModal(false)}
      />
        ) : null
      )
    }
  </>  
)
}
export default BulkActions