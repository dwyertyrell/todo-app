Feature: Adding a todo 

As a user, i want to add a new todo item so i can track my tasks.

Scenario: User enters a valid todo item
  Given the todo list is rendered  
  When user submits 'buy milk' in form field
  Then the todo list should contian milk and the success notification dialoag appear.

Scenario: User submits the form with an empty input.
  Given the todo list is rendered
  When the user submits an empty string value
  Then the todo list is not updated with an empty string todo and the error notification dialog should appear

Scenario: User submit a form with of a duplicate todo item
  Given the todo list is rendered
  When the user submits a duplicated todo that is already in todo lists
  Then the todo list is not updated with user input and the error notification dialog should appear



