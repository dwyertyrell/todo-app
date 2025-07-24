const express = require('express')
const router = express.Router(); 
const todosController = require('../controllers/todosController');

router.get('/', todosController.getTodos); 
router.post('/', todosController.createTodo);

// attaching each HTTP route to the router object, then export to be accessed by the controller dir for validation 

module.exports = router