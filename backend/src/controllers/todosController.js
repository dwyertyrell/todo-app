const {
  sendSuccess, 
  sendError,
  sendCreated,
  sendNotFound,
  sendAccepted
} = require( '../utils/responseHelpers')

const {
  getAllTodos, 
  addTodo,
  updateTodo,
  deleteTodo
} = require('../data/todoStore')


/**
 * Get all the todos for the current request
 * @param {object} req - Express request object
 * @param {object} res - Express response object  
 * @returns {void} Sends JSON array of todos to the client
 */
exports.getTodos =(req, res) => {
  const todos = getAllTodos()
  return sendSuccess(res, todos, 'todo list fetched')
};


/** 
 * Add a todo to the todo list
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {void} Sends a JSON response with the new todo item or an error message to the client
 */
exports.createTodo = (req, res) => {
  const {text} = req.body

  if (!text || typeof text !== 'string') {
    return sendError(res, 'invalid todo text', 'something went wrong');
  }
  const todo = addTodo(text);
  return sendCreated(res, todo, 'created')
};



/** 
 * Update a current todo item
 * @param {object} req - Express request object
 * @param {object} res - Express response object 
 * @returns {void} Sends a JSON response of the updated todo or an error message to client.
 */
exports.updateTodo = (req, res) => {
  const todoId = parseInt(req.params.id, 10) // selecting data from the url string
  const {text} = req.body // selecting data from the request body

  if(!text || typeof text !== 'string'){
    return sendError(res, 'invalid todo text', 'something went wrong')
  } 
  const todo = updateTodo(todoId, text)
  if(!todo){
    return sendNotFound(res, 'error', 'Todo Not Found')
  }
  return sendAccepted(res, todo, 'Accepted')
}

/**
 * Delete a todo from todo list
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @returns Sends a JSON object or an error message to the client 
 */
exports.deleteTodo = (req, res) => {
  const todoId = parseInt(req.params.id, 10)
  const todo = deleteTodo(todoId)
  if(!todo){
    return sendNotFound(res, 'error', 'Todo not found')
  }
  return sendAccepted(res, todo, 'Accepted')
}