const express = require('express')
const router = express.Router(); 
const todosController = require('../controllers/todosController');
//defines which endpoint gets to exist and which controller handles them
//the HTTP method coupled with the endpoint, is enough info to match each api url with its corresponding request handler
router.get('/', todosController.getTodos); 
router.post('/', todosController.createTodo);
router.put('/:id', todosController.updateTodo)
router.delete('/:id', todosController.deleteTodo)

// attaching each HTTP route to the router object, then export to be accessed by the controller dir for validation 

module.exports = router