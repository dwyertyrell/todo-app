# Todo App

A full stack Todo App built with **React.js** and **Node.js/Express.js**, and containerized with **Docker**. This is a mono-repo- building the client and the server side of the codebase- showing efficient modularization and good documentation. 

---

## Table of Contents

- [Featues](#features)
- [Architecture](#architecture)
- [API References](#api-references)
- [Getting Started](#getting-started)
- [Project Phases](#project-phases)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [More Documentation](#more-documentaion)

---

## Features

Core features include:
- **Add Todo**:
- **Edit Todo**:
- **Delete Todo**:
- **Mark as Completed**:
- **Persistent Storage**: In-Memory data store on node server, in backend- which can be upgraded to a database.
- **Bulk Actions**: Mark all as completed; delete all.
- **UI Enhancement**: Confirmation dialogs, notification system, input validation 

See [docs/features.md](./docs/features.md) for full details.

---

## Architecture

### Overview 

- **Backend**: Node.js with Express.js. Handles API requests, data managament,  error handling, and routing.

- **Frontend**: React.js. Communicates with the backend via HTTP requests, renders UI components.

- **Structure**: 
  - `backend/`: Entry-point (index.js), routes, controller, in-memory data, utilities.
  - `frontend/`: Main app and modular components( atomic/molecules/organism design)

- **Flow**:
  -Express recieves the request, routes to controllers, controllers validate/process the request; and mutate data, responses send back to client

See [docs/Architecutre.md](./docs/architecture.md) for full details. 

---

## API References 

All endpoints are prefixed with `'/todos`. API expects and returns a JSON.

Example endpoint:
- `GET /todos`: Retrieve all todos.
- `POST /todos`: Create a new todo
- `PUT /todos/:id`: Update a todo
- `PUT /todos/:id/completed`: completion of a todo
- `DELETE /todos/:id`:  Deletion of a todos 

  _endpoints for bulk API requests_:
- `PUT /todos/completed`: Bulk completion of all todos 
- `DELETE /todos`: Bulk deletion of all todos 

See [docs/api.md](./docs/api.md) and [docs/swagger.yaml](./docs/swagger.yaml) for full details 

---

## Getting Started

### Local Setup (no docker)

1. start backend:
```bash
cd backend
npm start
```

2. In a new terminal, start frontend:

```bash
cd frontend
npm run dev
```
3. Open the provided localhost link in broswer

### Docker Setup

1. Install Docker and verify with `docker --version`
2. Ensure `docker-compose.yml` is in the root directory
3. run:
```bash
docker compose up --buid
```
<!-- - Frontend: [add the url link to localhost of frontend]() should be localhost:3000 -->

<!-- - Backend: [add the url link to localhost of frontend]() should be localhost:8000 -->

---

## Project Phases
Development tracked in phases:

1. **Setup and Basic CRUD**: Initial structure, In-memory storage, CRUD operations.

2. **Modularization and Docker**: Refactored the backend for modularity, added Docker, and response helpers.

3. **Error handling and API Consistency**: Centralised error handling, and request validation.


4. **Frontend Modularzation and Advanced Functionality**: Modularized React components with atomic design; advanced filtering/sorting; and UI enhancements.

Full Breakdown: [docs/PROJECT_PHASES](./docs/PROJECT_PHASES.md)


---
## Testing


---

## Troubleshooting

- Always start the backend before the frontend, for in-memory storage.
- Docker: run `docker compose up` in root. to rebuild containers, run `docker compose down` and `docker compose up --build`.
For more common errors and solutions: see [troubleshooting](./docs/troubleshooting.md).

---

## More Documentaion

Detailed guides and references are in the `docs/` folder:

- [README.md](./docs/README.md)
- [api.md](./docs/api.md)
- [architecture.md](./docs/architecture.md)
- [features.md](./docs/features.md)
- [PROJECT PHASES.md](./docs/PROJECT_PHASES.md)
- [getting started.md](./docs/getting-started.md)
<!-- -[testing.md](./docs/testing.md) -->
<!-- - [bugLog.md](./docs/bugLog.md) -->


-----

## Contribution 

Feel free to open issues or pull requests! For any questions, see documentation or message the repo owner.

---

## License

MIT