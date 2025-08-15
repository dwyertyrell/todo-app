const express = require('express');
const YAML = require('yamljs')
const swaggerUi = require('swagger-ui-express')

const cors = require('cors');
const todosRouter = require('./routes/todos');
const swaggerDocument = YAML.load('../docs/swagger.yaml') 
const app = express();
const PORT = process.env.PORT || 5000
const {sendError, sendNotFound} = require('./utils/responseHelpers')

/**
 * Entry point for the Express backend server
 * 
 * -Sets up CORS, JSON parsing and routes for /todos endpoints
 * Handles 404s and centralised error responses
 * Starts listening on the specified port  
 */

app.use(cors());
app.use(express.json()); // parse JSON bodies for all requests

//Redirects each API URL with endpoint '/todos', to the correct routing file in `routes` dir
app.use('/todos', todosRouter) 

//setting up a route in the express app to view the interactive swagger UI document on client side
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//404 handler for unmatched routes
app.use((req, res) => {
  sendNotFound(res, 'error', 'unmatched route not found')
//use a specific 404 error middleware
});

//if a request matches the valid route, but still contains an error
app.use((err, req, res, next) => {
  console.error(err.stack) //logs where the error is in the code
  sendError(res, err.stack || 'error', err.message || 'Internal Error', err.status || 500)
  
})

app.listen(PORT, () => {
  console.log(`backend is listening on ${PORT}`)
});