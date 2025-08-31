# Project Architecture 

## Overview

This project is structerd as a modular Express.js backend with a React.js client frontend. The backend is responsible for handling API requests, managing data, and serving predictable repsonses. While the frontend interacts with backend via HTTP 

## Structure 

-**Backend:**
  - `index.js`: the main entry-point file for the backend, responsible for the validating endpoints and delegating requests to routers
  - `routes/`: Contains the route definitions (e.g. `/todos`), which pairs requests with speific controllers.
  - `controllers/`: Contains all the controller functions that handles the logic for each route: this includes the validation and processing the incoming data.

  - `data/`: Stores the in-memory node server database (`todoStore.js`) and access functions for CRUD operations.     

  - `utils/`: Includes helper functions to help construct responses and error handling

-**Frontend:** 
  - Sends HTTP requests using `fetch()` to interact with the backend API.  

## Flow

1. **Request Handling:**

    How Express handles API request from the Client?
    
    When an API request is made to the backend, it reaches Express and 

    Express creates:

      - the request object holding data from the client: 
        - API URL; HTTP Method; request body;  metadata, etc.
        
        <small>the api url and the method helps direct a api request to its corresponding router function.</small>

    - The empty template of a response object that will be hold the payload. 

      <small>As shown above, the controllers does not actually create the initial response object; Express does this internally for every incoming HTTP request, upon reaching the entry-point.</small>

    The fetch() callback from the frontend, sends an API request to the backend, through the main entry-point file.

    The Express app recieves an HTTP request from the client. 

    This file, being at the highest level of entry, **will validate the endpoint** before passing into the next layer of the server.

    Middleware functions in the entry-point file, processes the request for:

    - CORS and JSON parsing
    - Routing to the appropriate endpoint
    - 404 and error handling

    



2. **Routing:**
    Routers delegate requests to the controller functions based on the API URL and HTTP method

3. **Controllers:**

    The controllers validate the incoming request bodies, interact with (mutate) the data layer and construct response objects for the client

    How does the controller functions mutate the data?

    Functions that mutate the database ([access functions](../backend/src/data/todoStore.js)) are exported into the `controllers/ dir`, so the controllers can update the database straight after it has validated incomming client data in the HTTP request body, accordingly. 
    Once validated, the payload in the `res.body` can be used in the rest of the backend code the [in-memory data](../backend/src/data/todoStore.js); 

    A [controller function](../backend/src/controllers/) pass this data into the [in-memory data storage](../backend/src/data), via the [exported access functions](../backend/src/data/todoStore.js), and then use their return to construct a response object. 
    However, it checks if the [access functions](../backend/src/data/todoStore.js) returned any errors, and then stringifying the response object using `res.json()` method- so it can be sent back to the client.

    This would be seen in the calling of a fetch() callback- which returns a promise block.

4. **Data:**

    Access functions in [data/todoStore.js](../backend/src/data/todoStore.js), perform CRUD operations on the in-memory data store and return the result to the controllers, to be rendered on the client-side.
 
5. **Error Handling:**

    Custom middleware and [helpers](../backend/src/utils/responseHelpers.js) manage errors and send standardized response.

    Express has a built-in error handling middleware, for which i used in the [entry-point file](../backend/src/index.js) to centralised all error responses. This middleware can be called simply by throwing new Error object, `throw new Error()`, anywhere in an error validating. 
    This will then call the response object in the error middleware to the client.

    As simple and as built-in this approach may be, I still decided to go on with [a custom response helper function](../backend/src/utils/responseHelpers.js), `sendError()`, for returning an error response to client. 

    This was the best possible choice to gain a greater degree of  control over the API and to have a more predictable reaction from it, after recieving a HTTP request.


## Design Decisions

### Modularising the backend

In [phase 2](./PROJECT_PHASES.md), I wanted to focus on making the backend more modular by adding a separate directory for the [in-memory data](../backend/src/data/todoStore.js), which was initially on the [entry-point file](../backend/src/index.js). 

Another directory was also made for [validating the API requests](../backend/src/controllers).
At the end of phase 1 the entry-point file- that was holding all the code for the backend- will be refactored 
to only handle the traffic between the API HTTP requests and in-memory database .
It will be the [routes directory](../backend/src/routes/) that will handle the routing of these requests- by matching URL and directing these requests to the appropiate [controller functions](../backend/src/controllers/)

In effect, the [index.js](../backend/src/index.js) will _delegate_ the requests to the [routes directory](../backend/src/routes/), 
which will then _delegate_ the requests to the [controller directory](../backend/src/controllers/) - which that has direct access to the [data stored on node server](../backend/src/data/todoStore.js).

_How does Express know to pass the request and response objects to the custom-made controller functions?_

Due to how the routing is set up in the [entry file](../backend/src/index.js) & [route directory](../backend/src/routes/todos.js). In these files, once the router middleware tells express to use the router for an `/todos` endpoint, and an API request matches a route, Express automatically recognises the custom-made functions as controllers, and passes in the req and res objects.


_If [index.js file](../backend/src/index.js) directly called [controller functions](../backend/src/controllers/), managing the routing would be very difficult as the codebase becomes more complex: becoming harder to scale the application; harder to add middleware to
a specific route group. 
However, in this phase of development, the middlewares that could be placed in the ['/todos' endpoint routing](../backend/src/routes/todos.js), are for adding validation to the request bodies- that which the controller functions already exists for_




<!--
---

### API documentation

- **swagger file**
  - when the backend is runnning, visit the backend's endpoint `/api-docs`
 -->
<!-- 
## logic flow of the entry-point file in the backend: index.js

Once the server startup on the docker container or on node `app.listen(PORT,()=>{})`, this creates a HTTP server on the specified port.

This server can recieve HTTP requests from the clients (the browser). 
the request hit the server and the express app receives the API request.
now the express app can handle the request
with its middlewares and handlers.

  #### the 1st middleware:

  -`app.use(cors())`` 
    apply cors middleware to allow frontend to communicate with backend. 
    browsers same-origin policy always block requests between different origins
  #### the 2nd middleware:

  -`app.use(express.json())`
    parse all  request bodies from string into JSON format before reaching the route handlers.
  #### the 3rd middleware:

  -`app.use(`/todos`, todosRouter)`
    this redirects the api URL with this endpoint, into the file assigned to `todosRouter`.
    if not, then skip this and move onto the next middleware.

  #### the 4th middleware:

  -`app.use((req,res,next) =>{res.status(404).json({error: 'something went wrong'})})`
    this is a 404 handler (and not seen as an error middleware) that catches any request
    that is not matching the endpoint stated in the previous middleware

  #### the 5th middleware:

  -`app.use((err,req,res,next))`
  now, this is an actual error middleware (therefore requires tthe 4 parameters). 
  this, and the 404 handler, are mutaully exclusive. If one runs, the other isn't called.
  therefore, if the request is not handled by the 404 handler and there is an error, this middleware will be called.
  this error could be found in how the controller or data store interacts with the request. 

 -->
