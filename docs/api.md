
## How the API managage the flow of data

### How Express handles API request from the Client
When an API request is made to the backend, it reaches Express and 

Express creates:

  - the request object holding data from the client: 
    - API URL; HTTP Method; request body;  metadata, etc.
    
    <small>the api url and the method helps direct a api request to its corresponding router function.</small>

- The empty template of a response object that will be hold the payload. 

  <small>As shown above, the controllers does not actually create the initial response object; Express does this internally for every incoming HTTP request, upon reaching the entry-point.</small>

The fetch() callback from the frontend, sends an API request to the backend, through the main entry-point file.

This file, being at the highest level of entry, **will validate the endpoint** (link here to the router directing middleware in index.js)before passing onto the router functions; and then the controller functions. 

The controller functions **will then validate the logic of the request object** of this HTTP method. 

Once validated, the response object is constructed and sent back to the frontend, with a payload. the response helpers would help put the corresponding data into the empty template, and then send the actual http response to the client.
This would be seen in the calling of a fetch(), which is then used for the client.  


---

### Modularising the backend

In [phase 2](./PROJECT_PHASES.md), I wanted to focus on making the backend more modular by adding a separate directory for the [in-memory data](../backend/src/data/todoStore.js) which was initially on the [entry-point file](../backend/src/index.js). 

Another directory was also made for [validating the API requests](../backend/src/controllers).
At the end of phase 1, the entry-point file that was holding all the code for the backend, will be refactored 
to only handle the traffic between the API HTTP requests and in-memory database .
It will be the [routes directory](../backend/src/routes/) that will handle the routing of these requests- by matching URL and directing these requests to the appropiate [controller functions](../backend/src/controllers/)

In effect, the [index.js](../backend/src/index.js) will _delegate_ the requests to the [routes directory](../backend/src/routes/), 
which will then _delegate_ the requests to the [controller directory](../backend/src/controllers/) - which that has direct access to the [data stored on node server](../backend/src/data/todoStore.js).

_If [index.js file](../backend/src/index.js) directly called [controller functions](../backend/src/controllers/), the ability to cleanly manage routing would be lost as the codebase becomes more complex. Becoming harder to scale the application; harder to add middleware to
a specific route group. 
However, in this phase of development, the middlewares that could be placed in the ['/todos' endpoint routing](../backend/src/routes/todos.js), are for adding validation to the request bodies- that which the controller functions exists for_

---
### How does the controller functions mutate the data

Functions that mutate the database are exported into the controllers directory, so the controllers can update the database straight after it has validated incomming client data in the HTTP request body, accordingly. 
Once validated, the payload in the `res.body` can be used in the rest of the backend code [the in-memory data](../backend/src/data/todoStore.js); 

A[controller function](../backend/src/controllers/) pass this data into the [in-memory data storage](../backend/src/data), via the [exported access functions](../backend/src/data/todoStore.js).
Checking if the [access functions](../backend/src/data/todoStore.js) returned any errors, and then stringifying the response object using `res.json()` method- so it can be sent back to the client.

 
 

---
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
