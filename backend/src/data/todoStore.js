
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

function getAllTodos() {
  return todos
};

function addTodo(text) {
  const todo = {id: id++, text} // takes data from request body and provides an id
  todos.push(todo)
  return todo; //return the newly updated array- addTodo() is called in a res.body
}


module.exports = {getAllTodos, addTodo}
