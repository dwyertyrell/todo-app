Feature: Notification component

Scenario: Display a success notification when adding a todo
  Given the user has already added a todo successfully
  When the notification component is rendered
  Then the notification should display a success notification message and disappear after 3000ms


Scenario: Display an error notification when user tries to add an empty todo
  Given the user has already failed to add a todo 
  When the notification component is rendered
  Then the notification should display an error notification message and disaapear after 3000ms