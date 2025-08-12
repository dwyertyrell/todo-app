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

<!-- - Start JSDoc comments and consider Swagger for endpoints -->

<!-- - add advanced todo operations for UI improvements (e.g. mark complete, filter/search) -->

<!-- added unit testing  -->
