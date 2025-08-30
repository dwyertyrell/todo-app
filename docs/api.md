# API Documentation

## Endpoints
All endpoints are prefixed with `/todos`. The API expects and returns JSON.

### GET /todos 
- **Description:** retrieve todos list
-**Response:** 
  ```
  json
  [
    {
      "id": 1,
      "text": "Example task",
      "completed": false,
      "createdAt": "2025-08-11"
    },
    {
      "id": 2,
      "text": "Example task 2",
      "completed": false,
      "createdAt": "2025-08-13"
    }
  ]
  ```

### POST /todos 
- **Description:** create a new todo item
-**Response:**

```
json
    {
      "id": 3,
      "text": "Example task 2",
      "completed": false,
      "createdAt": "2025-08-13"
    }

```




<!-- for the partial update of a todo object replace method with PATCH /todos/:id -->
### PUT /todos/:id 
-**Description:** updating a todo item
-**Response:**

  ```
  json
    {
      "id": 3,
      "text": "Example task 2",
      "completed": false,
      "createdAt": "2025-08-13"
    }
  
  ```

### PUT /todos
-**Description:** bulk completion of all todo items
-**Response:**

  ```
  [
    {
      "id": 1,
      "text": "Example task",
      "completed": true,
      "createdAt": "2025-08-11"
    },
    {
      "id": 2,
      "text": "Example task 2",
      "completed": true,
      "createdAt": "2025-08-13"
    }
  ]
  ```

### PUT /todos/:id/completed
-**Description:** marking a todo as completed
-**Response:**

  ```
  json
    {
      "id": 3,
      "text": "Example task 2",
      "completed": true,
      "createdAt": "2025-08-13"
    }
  
  ```

### DELETE /todos
-**Description:** deleting the entire todo list
-**Response:**

  ```
  json
  []
  
  ```
### DELETE /todo/:id 
-**Description:** deleting a single todo item
-**Response:**

  ```
  json
    {
      "id": 3,
      "text": "Example task 2",
      "completed": true,
      "createdAt": "2025-08-13"
    }
  
  ```


## Notes 
- All requests must be sent with `'Content Type': 'application/json'` header.
- Validation is handled in [controllers](../backend/src/controllers/). Therefore, bad requests: incomplete or malformed, will recieve a 400 error.

-For more information about the structure of the backend, see [architecture](./architecture.md).

Feel free to send me a personal message if you want to know more about the backend structure. This includes: endpoint documentation, request/response examples, etc.