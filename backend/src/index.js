const express = require('express');
const cors = require('cors');
const todosRouter = require('./routes/todos');
const app = express();
const PORT = process.env.PORT || 5000
const {sendError, sendNotFound} = require('./utils/responseHelpers')


app.use(cors());
app.use(express.json()); // parse JSON bodies for all requests

//Redirects each API URL with endpoint '/todos', to the correct routing file in `routes` dir
app.use('/todos', todosRouter) 

//404 handler for unmatched routes
app.use((req, res) => {
  // res.status(404).json({error: 'Not Found'})
  sendNotFound(res, 'error', 'unmatched route not found')

});

//if a request matches the valid route, but still contains an error
app.use((err, req, res, next) => {
  console.error(err.stack) //logs where the error is in the code
  sendError(res, err.stack || 'error', err.message || 'Internal Error', err.status || 500)
})

app.listen(PORT, () => {
  console.log(`backend is listening on ${PORT}`)
});