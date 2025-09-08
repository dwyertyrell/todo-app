# UNIT TEST
Feature: Delete Todo
As a user, i want to delete todo from my todo list, when tasks are not needed anymore.

Scenario: User wants to delete a todo from the todo list.
  Given the 'Delete' button is rendedred next to the todo item.
  When the user clicks the 'Delete' button.
  Then the todo list should not contain the todo item.