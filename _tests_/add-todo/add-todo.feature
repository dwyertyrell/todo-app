#(UNIT TESTS for jest testing. therefore, these ghenkin style .Feature files are not necessary for the outcome of each test)
Feature: Add Todo
As a user, i want to add new tasks to my todo lists so i can keep track of what needs to be done.

Scenarios: User adds a valid todo item
  Given the todo list is rendered.
  When the user submits 'buy milk'.
  Then the todo list should contain 'buy milk'.

Scenarios: User tries to add an empty todo item
  Given the todo list is rendered.
  When the user submits an empty input string.
  Then the todo list should remain the same.


Scenario: User tries to add a duplicate todo item
  Given the todo list is rendered.
  When the user submits an duplicate todo item.
  Then the todo list should remain the same.
