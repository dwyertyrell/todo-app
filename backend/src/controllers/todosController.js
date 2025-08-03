const {
  sendSuccess, 
  sendError,
  sendCreated,
  sendNotFound,
  sendAccepted
} = require( '../utils/responseHelpers')

//this file validates each HTTP request and then calls functions from databse

const {
  getAllTodos, 
  addTodo,
  updateTodo,
  deleteTodo
} = require('../data/todoStore')


//get all todos
exports.getTodos =(req, res) => {
  res.json(getAllTodos()) // parses the string into a JS object
};

//add a new todo 
exports.createTodo = (req, res) => {
  const {text} = req.body

  if (!text || typeof text !== 'string') {
    //the exported helper functions contains the json body of the response, allowing the validation to be more concise   
    return sendError(res, 'invalid todo text', 'something went wrong');
  }
  
  const todo = addTodo(text);
  return sendCreated(res, todo, 'created')
};

//update a todo
exports.updateTodo = (req, res) => {
  //selecting the data from the req.body and stringed url paramter, :id
  const todoId = parseInt(req.params.id, 10) //
  const {text} = req.body
  //this is the validation 
  if(!text || typeof text !== 'string'){
    return sendError(res, 'invalid todo text', 'something went wrong')
  } 
  const todo = updateTodo(todoId, text)
  if(!todo){
    return sendNotFound(res, 'error', 'Todo Not Found')
  }
  return sendAccepted(res, todo, 'Accepted')
}

//delete a todo
exports.deleteTodo = (req, res) => {
  const todoId = parseInt(req.params.id, 10)
  const todo = deleteTodo(todoId)
  if(!todo){
    return sendNotFound(res, 'error', 'Todo not found')
  }
  return sendAccepted(res, todo, 'Accepted')
}