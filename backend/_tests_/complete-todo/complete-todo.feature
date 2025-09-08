# UNIT TEST

Feature: Mark as Completed
As a user, i want to mark a todo as completed, once the task is done

Scenario: User wants to mark a todo item as complete
  Given the checkbox is rendered next to the todo item.
  When the user selects the checkbox.
  Then the checkbox should be truthy. 