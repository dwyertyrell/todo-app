
// the in-memory storage for todos 
let id = 3;
let todos = [
  {
    id: 1,
    text: 'wash the bath'
  },
  {
    id: 2,
    text: 'clean the room'
  },
]

/**
 * Get all the todos for the controller function
 * @returns {Array<Object>} Sends an array of todos to the controller 
 */

function getAllTodos() {
  return todos
};

/**
 * Add to the todos array  
 * @param {string} input data passed by the controller, to create a todo item   
 * @returns {object} Sends an object to the controller 
 */

function addTodo(text) {
  const todo = {id: id++, text} // since this is called in a controller function, it takes data from request body (req.body.text) and provides an id
  todos.push(todo)
  return todo; // addTodo() is called in a res.body
}

/**
 * Finds a todo by id
 * @param {number} todoId 
 * @returns {object} Sends a todo with mathcing id 
 */

function getTodoById(todoId) {
  return todos.find(todo => todo.id === todoId)
}

/**
 * Update a current todo item 
 * @param {*} todoId 
 * @param {*} text 
 * @returns {object| null} Sends the updated todo to the controller or sends an error
 */

function updateTodo(todoId, text) {
  const todo = getTodoById(todoId) 
  if(!todo) return null //error validating- incorrecting selecting of :id params, in controller
  todo.text = text 
  return todo  
}

/**
 * Delete a todo item 
 * @param {number} todoId 
 * @returns {object|null} Sends the deleted todo back to the controller or sends error
 */

function deleteTodo(todoId) {
//find the index of the todoId in the array 
const index = todos.findIndex(todo => todo.id ===todoId)
if(index === -1) return null
//.splice returns an array of elements that were removed
const removed = todos.splice(index, 1)[0]
return removed
} 



module.exports = {getAllTodos, addTodo, updateTodo, deleteTodo}
