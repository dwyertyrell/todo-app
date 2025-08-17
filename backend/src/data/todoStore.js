
// the in-memory storage for todos 
let id = 5;
let todos = [
  {
    id: 1,
    text: 'wash the bath',
    completed: false,
    createdAt: new Date().toISOString().slice(0, 10)
  },
  {
    id: 2,
    text: 'clean the room',
    completed: false,
    createdAt: new Date().toISOString().slice(0, 10)
  },
  {
    id: 3,
    text: 'sweep the stairs',
    completed: false,
    createdAt: new Date().toISOString().slice(0, 10)
  },
  {
    id: 4,
    text: 'take a walk',
    completed: false,
    createdAt: new Date().toISOString().slice(0, 10)
  },
]

/**
 * Get all the todos for the controller function
 * @returns {Array<Object>} Sends an array of todos to the controller 
 */

function getAllTodosData() {
  return todos
};

/**
 * Add to the todos array  
 * @param {string} input data passed by the controller, to create a todo item   
 * @returns {object} Sends an object to the controller 
 */

function addTodoData(text) {
  const todo = {id: id++, text, completed: false, createdAt: new Date().toISOString().slice(0, 10)} // since this is called in a controller function, it takes data from request body (req.body.text) and provides an id
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

function updateTodoData(todoId, text) {
  const todo = getTodoById(todoId) 
  if(!todo) return null //error validating- incorrecting selecting of :id params, in controller
  todo.text = text 
  return todo  
}

function toggleCompletedData(todoId) {
  const todo = getTodoById(todoId)
  if (!todo) return null
  todo.completed = !todo.completed
  return todo
}

//bulk action for marking all todo items as completed
function markAllCompletedData() {
  todos.completed = true
}

/**
 * Delete a todo item 
 * @param {number} todoId 
 * @returns {object|null} Sends the deleted todo back to the controller or sends error
 */

function deleteTodoData(todoId) {
//find the index of the todoId in the array 
const index = todos.findIndex(todo => todo.id ===todoId)
if(index === -1) return null
//.splice returns an array of elements that were removed
const removed = todos.splice(index, 1)[0]
return removed
} 

// bulk action for deleting the whole list
function clearTodosData() {
  todos.length = 0
}


module.exports = {
  getAllTodosData, 
  addTodoData, 
  updateTodoData, 
  deleteTodoData, 
  toggleCompletedData,
  clearTodosData,
  markAllCompletedData
}
