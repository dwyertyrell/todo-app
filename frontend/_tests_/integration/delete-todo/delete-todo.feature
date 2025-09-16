Feature: deleting todo item

As a user, i want to delete a todo so i can remove taks i no longer need
  
Scenario: User clicks the delete button; a todo item is removed from list
  Given the todo list is rendered with 'Delete' button on every todo item
  When the user clicks the button and 

As a user, i want to delete all todo items at once

Scenario: User clicks "Delete All" button; and todo list is empty
  Given the todo list and 'Delete All' button is rendered 
  When the user clicks the 'Delete All' button and confirmation modal appears
  Then user clicks 'Confirm' button in the modal  
  And the todo list is empty 