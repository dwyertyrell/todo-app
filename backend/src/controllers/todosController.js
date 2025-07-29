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
    return res.status(400).json({error: 'invalid todo text'});
  }
  
  const todo = addTodo(text);
  res.status(201).json(todo) // parses the string into a JS object, in res body  
};

//update a todo
exports.updateTodo = (req, res) => {
  //selecting the data from the req.body and stringed url paramter, :id
  const todoId = parseInt(req.params.id, 10) //
  const {text} = req.body
  //this is the validation 
  if(!text || typeof text !== 'string'){
    return res.status(400).json({error: 'Invalid todo text'})
  } 
  const todo = updateTodo(todoId, text)
  if(!todo){
    return res.status(404).json({error: 'Todo not found'})
  }
  return res.status(202).json(todo)
}

//delete a todo
exports.deleteTodo = (req, res) => {
  const todoId = parseInt(req.params.id, 10)
  const todo = deleteTodo(todoId)
  if(!todo){
    return res.status(404).json({error:'Todo is not found'})
  }
  return res.status(202).json({message: 'Todo deleted', todo})
}