
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

//to get the todo list 
function getAllTodos() {
  return todos
};

//to add to the todo list
function addTodo(text) {
  const todo = {id: id++, text} // since this is called in a controller function, it takes data from request body (req.body.text) and provides an id
  todos.push(todo)
  return todo; // addTodo() is called in a res.body
}

//get a todo by id 
function getTodoById(todoId) {
  return todos.find(todo => todo.id === todoId)
}

//update a current todo item
function updateTodo(todoId, text) {
  // using the previous callback's logic to select the item
  const todo = getTodoById(todoId) 
  if(!todo) return null
  todo.text = text // assigning the property to the parameter's value
  return todo 
}

//delete a todo item 
function deleteTodo(todoId) {
//find the index of the todoId in the array 
const index = todos.findIndex(todo => todo.id ===todoId)
if(index === -1) return null
//.splice returns an array of elements that were removed
const removed = todos.splice(index, 1)[0]
return removed
} 



module.exports = {getAllTodos, addTodo, updateTodo, deleteTodo}
