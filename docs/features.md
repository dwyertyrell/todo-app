# Feature Documentation
  _this covers the features of the Todo-app project, including their purpose and usuage instructions_


# 1. Feature Overview

### Add Todo

- **Description:** Allows users to create new todo items.

- **Motivation:** Users can keep track of tasks by adding them to their todo list

- **Implementation:**
  - Main logic in `src/components/AddTodo.js`
  - Updates the todo state in the app component `src/App.jsx`.


- **usuage:** 
  - Enter a task in the input field and click 'Add'

- **Testing:** 
  - try adding a new todo and ensure it appears in the list
  <!-- create a user story for this unit testing -->


### Edit Todo

- **Description:** Allows users to change the text of their todo items

- **Motivation:** Users may need to update the details of their tasks

- **Implementation:**
  - Editing handled in `src/components/TodoItem.jsx`
  - Updates the todos array with the modified value

- **Usage:**
  - Click the 'edit' button next to a todo, change the text and then save.

- **Testing:**
  - Edit a todo and ensure the change appears are reflected on the list.
  <!-- create user stories for this unit testing-->


### Delete Todo 

- **Description:** Allows users to delete a todo item

- **Motivation:** Users can choose to delete a todo from their task

- **Implementation:**
  - deletion logic handled in `src/components/TodoItem.jsx`
  - Remove item from the todos array

- **Usage:** 
  - click 'Delete' button next to a todo

- **Testing:**
  - Delete a todo and check that it disappear from the list 
    <!-- create user stories for this unit testing-->


### Mark as Completed

- **Description:** Allows users to mark a todo as 'complete'

- **Motivation:** once task is complete, users can track the changes

- **Implementation:** 
  - Completion logic handled in `src/components/TodoItem.jsx`
  - Toggle 'completed' status on the todo item.

- **Usage:** 
  - click the checkbox to mark a todo as completed

- **Testing:**
  - mark a todo as 'completed' as see if status changes are reflected



  ### Persistent Storage
  
  ### Bulk Actions

  ### UI Enhancements
  <!-- confirmation dialoags; notification system; input validation; filtering/sorting; (responsive design?) -->