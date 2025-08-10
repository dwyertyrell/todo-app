# phase 2:
this phase, I want to focus on making the backend more modular by adding a separate 
directory for the in-memory database (`data` dir), and another one for handling the API requests
( the `controller` dir).
at the end of phase 1, index.js file, entry-point file  was holding all the code for the backend, will be refactored 
to only handle the traffic between the in-memory database and the HTTP requests.
Although the `controller` directory will be handling the logic for the API (HTTP) requests,
it will be the `routes` directory that will handle the routing of these requests.
the `routes` dir will focus on url pattern matching and directing these requests 
to the appropiate controller function

in effect, the `index.js` will delegate the requests to the `routes` directory, 
which will then delegate the requests to the `controller` directory.

(if `index.js` file directly called `controller` functions, you would lose the ability to 
cleanly manage routing. It becomes harder to scale the application; harder to add middleware to
a specific route group. however, the middleware only add validation to the routes that the controller function already adds)


export the functions (that mutate the database) from the (in-memory database) 
todoStore.js, into the controllers dir, so the controller file can update the 
database straight after it has handled out the HTTP request body accordingly. 
essentially, it is validating the request body; checking if there are 
any errors and then converting using json() method.
Once validated, it can be used back with the rest of the backend code (the database); 
the controller function pass this data into the database, via the exported functions from the todoStore.js file. 

^^^the flow of this logic above:

starts when the user sends a request from the 
frontend- e.g. making a POST request with a JSON body .
any request starting with `/todos` is forwarded to router in the `route/todos.js`

this tells express to call appropiate controller function, which validates the HTTP request body. 



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
