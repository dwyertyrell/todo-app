Feature: Editing a todo 

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

As a user, i want to mark a todo as completed so i can see which tasks are done.

  Scenario: User marks a todo item as 'complete'
    Given the todo list is rendered with the checkbox
    When the user selects the checkbox 
    Then a strike-through is shown on the todo text

As a user, i want to mark all todo items as completed, at once.

  Scenario: User marks all todo items as completed
    Given the todo list is rendered
    When the user clicks the 'Complete All' button
    Then every todo item is marked as completed   