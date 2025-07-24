const {getAllTodos, addTodo} = require('../data/todoStore')


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
