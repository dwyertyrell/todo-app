# Project plan: Todo-app

This document covers the development process for this application, in phases. From the in-memory data storage, to the SQL database implementation; modularising the backend directory from its entry-point file; and progressive enhancements on the frontend 



## Phase 1: 
_Initialised Setup and basic CRUD Functionality_

**initialised project structure**
- set up the backend with node.js and Express

- created basic frontend with HTML, CSS, and React.

**Created In-Memory Data Storage**
- store the initial todo list on node server

**Add essential CRUD routes**
- Added the essential CRUD routes in order to expand on the backend to start managing the API: Create, Read, Update, Delete. 

**Connecting the frontend to backend**
- using the CRUD routes to create basic API calls, using functional components in React to handle each todo operation

---

## Phase 2
_Modularization & Docker Integration_

**Refactor backend for modularity**
- Separate all the logic in the entry-point file, into other directories: routes, controllers, data, utils.
- Introduced a [databse dir](../backend/src/data/todoStore.js) for handling access to the data using data access functions. _(even though it is  in-memory data stored on node.)_

**Implemented Response helpers**

- Standadized the API response via [utility functions](../backend/src/utils/responseHelpers.js)- to allow the API to react more predictable and concsie, for each request.

**Set up Docker containerization**

- Add dockerfiles and docker-compose configuration.

- Containerize frontend and backend for local development 

- Created a hidden .env file which holds the API_URL so containers can communicate between the frontend and backend services   

---

## Phase 3 
_Error Handling & API consistency_

**Centralize error handling**
- Added middlewares for [404s and unexpected errors](../backend/src/index.js) 

**Request Validation**
- Started implementing logic in the [controllers dir](../backend/src/controllers/todosController.js) to validate incoming data, sent by the client side.

**Uniform API responses**
- Continued implementing [response helpers](../backend/src/utils/responseHelpers.js) to ensure all endpoints returned a consistent response structure.  

---

## Phase 4 
_Frontend Modularization, Documentation, Advanced backend features_

**Modularized Frontend**
- Separate all the logic in the [main component](../frontend/src/App.jsx) of the frontend and created [child components](../frontend/src/components): AddTodoForm; TodoItem; TodoList, to hold the logic of each functionality needed by the main component.


 **Start API and code documentation** 
 - Created a doc directory for understanding this entire codebase. [click here](../docs/README.md) to start reading docs 

- Start JSDoc comments and use Swagger for API endpoints documentation

**Advanced Functionality**
  - Add ability to mark todos as completed or active 
  - Implement filter controls (show: all, completed, active) 
  - Add sorting options (by creation date, alphabetical, etc.) 
  - Add support for editing todo details inline 

**Atomic components**
- add atomic components for buttons, input elements, text, heading, labels,
and containers. 
- REFACTORED the modularized project structure to intentionally group the child react components in a [molecule](../frontend/src/components/molecules/) and [organism](../frontend/src/components/organisms/) folder- to better clarify their purpose and relation to the [atomic compoenents](../frontend/src/components/atomic). 
<!-- - add Storybook- a UI style guide for your website for easy visualisation for other developers -->

**User Experience & UI Enhancements**
  - Add confirmation [dialogs](../frontend/src/components/atomic/notification.jsx)/[modals](../frontend/src/components/atomic/modal.jsx) for delete/edit actions  
  - Add notification system (e.g., for successful or failed actions) as a global UI component in [central component](../frontend/src/app.jsx) via the `notify()` callback
  - Improve input validation (e.g., prevent empty/duplicate todos in form submission of [addTodoForm.jsx](../frontend/src/components/molecules/addTodoForm.jsx)) 
  - Add a “Clear All” button with confirmation 
  

**Backend Improvements**
  -  Add API endpoint for bulk actions (e.g., delete all, mark all completed) 
  -  Refactor API responses for consistency 
  <!-- -  Implement basic rate limiting ?? -->


<!-- added unit testing  -->

<!-- this is the complete detailed objective list phase of  4:

5. Testing & Quality
 Write unit tests for frontend components (using Jest, React Testing Library)
 Write integration tests for API endpoints (using supertest, etc.)
 Add linting and code formatting (e.g., ESLint, Prettier)

 
IGNORE FOR NOW- doesn't increase API complexity
3. Frontend Features
 Add visual indicators (e.g., strikethrough for completed)
 Add responsive/mobile-friendly styling
 Add keyboard accessibility (tab/enter for actions)
 Add animations/transitions for adding/removing/editing todos
 -->


<!-- after creating user accounts and auth, allow users to re-order items in their custom lists  -->