Feature: Editing a todo 



# create a 2nd integration test file for this, or a describe()?
As a user, i want to edit an existing todo so i can update my tasks

Scenario: User edits and update a todo item in the list 
  Given the todo list is rendered; and the 'Edit' is shown on each todo item
  When the user clicks the 'Edit' button on a todo item; switching to edit mode. 
  And  the user starts typing in the textbox  
  And the user clicks 'Save' button and a confirmation modal is rendered. 
  And the user clicks 'Confirm' button on the modal.
  Then the todo item is updated in the todo list. 
  And a success notification dialog is rendered on screen.

Scenario: User cancels editing; the todo returns to its previous state
  Given Editing mode is enabled
  When the user clicks the 'Cancel' button
  Then the editing mode is disabled; the 'Edit' button is appears next to the todo item.
