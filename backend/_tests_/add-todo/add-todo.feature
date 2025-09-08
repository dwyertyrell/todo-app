#(UNIT TESTS for jest testing- gherkin files are not needed to run these test)
# The user stories are for the business level or the client level unit tests  

Feature: Add Todo
As a user, i want to add new tasks to my todo lists so i can keep track of what needs to be done.

# for business logic and client layer
Scenarios: User adds a valid todo item
  Given the todo list is rendered.
  When the user submits 'buy milk'.
  Then the todo list should contain 'buy milk'.

# for business logic and client layer
Scenarios: User tries to add an empty todo item
  Given the todo list is rendered.
  When the user submits an empty input string.
  Then the todo list should remain the same.

# for client layer
Scenario: User tries to add a duplicate todo item
  Given the todo list is rendered.
  When the user submits an duplicate todo item.
  Then the todo list should remain the same.

# for business logic and client layer
Scenario: User tries to add a todo item that is not a string
  Given the todo is rendered.
  When the user submits an integer value in the form field
  Then the todo list remains the same.