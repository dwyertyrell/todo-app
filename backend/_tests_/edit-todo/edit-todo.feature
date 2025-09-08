#(unit test)
Feature: Edit Todo 
As a user, i want to make changes on current todos in case there are changes to my tasks.

Scenario: User wants to edit a existing todo item.
  Given the 'Edit' button is rendered next to the todo item.
  When the user submits a new string value for todo item.
  Then the todo list should render the updated todo item.

Scenario: User tries to remove all text from an existing todo item.
  Given the 'Edit' button is rendered next to the todo item.
  When the user submits an empty string value for todo item.
  Then the todo list should not render the new value for todo item.
