Feature:5 Bulk Actions
As a user, i want to delete all todos or mark or todos as completed, at once 

Scenario: User wants to delete all todo items from the list.
  Given the 'Delete All' button is rendedred.
  When the user clicks the 'Delete All' button.
  Then the todo list should be completely empty.

Scenario: User wants to mark all todo items, as 'Complete' from the list.
  Given the 'Complete All' button is rendedred.
  When the user clicks the 'Complete All' button.
  Then every item in the todo list should be marked as 'complete'.