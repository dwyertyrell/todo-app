const {
  sendSuccess, 
  sendError,
  sendCreated,
  sendNotFound,
  sendAccepted
} = require( '../utils/responseHelpers')

const {
  getAllTodosData, 
  addTodoData,
  updateTodoData,
  deleteTodoData,
  toggleCompletedData
} = require('../data/todoStore')


/**
 * Get all the todos for the current request
 * @param {object} req - Express request object
 * @param {object} res - Express response object  
 * @returns {void} Sends JSON array of todos to the client
 */
exports.getTodosController =(req, res) => {
  //  res.json(getAllTodos())
  const todos = getAllTodosData()
  return sendSuccess(res, todos, 'todo list fetched')
};


/** 
 * Add a todo to the todo list
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {void} Sends a JSON response with the new todo item or an error message to the client
 */
exports.createTodoController = (req, res) => {
  const {text} = req.body

  if (!text || typeof text !== 'string') {
    return sendError(res, 'invalid todo text', 'something went wrong');
  }
  const todo = addTodoData(text);
  return sendCreated(res, todo, 'created')
};



/** 
 * Update a current todo item
 * @param {object} req - Express request object
 * @param {object} res - Express response object 
 * @returns {void} Sends a JSON response of the updated todo or an error message to client.
 */
exports.updateTodoController = (req, res) => {
  const todoId = parseInt(req.params.id, 10) // selecting data from the url string
  const {text} = req.body // selecting data from the request body

  if(!text || typeof text !== 'string'){
    return sendError(res, 'invalid todo text', 'something went wrong')
  } 
  const todo = updateTodoData(todoId, text)
  if(!todo){
    return sendNotFound(res, 'error', 'Todo Not Found')
  }
  return sendAccepted(res, todo, 'Updated a todo')
}

exports.toggleCompletedController = (req,res) => {
const todoId = parseInt(req.params.id, 10)
if (!todoId) sendError(res, 'error', 'Todo Not found')
  const todo = toggleCompletedData(todoId)
sendAccepted(res, todo, 'Completed toggle')
}
/**
 * Delete a todo from todo list
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @returns Sends a JSON object or an error message to the client 
 */
exports.deleteTodoController = (req, res) => {
  const todoId = parseInt(req.params.id, 10)
  const todo = deleteTodoData(todoId)
  if(!todo){
    return sendNotFound(res, 'error', 'Todo not found')
  }
  return sendAccepted(res, todo, 'Deleted a todo')
}