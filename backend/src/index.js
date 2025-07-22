const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000

// the in-memory storage for todos 
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
let id = 3;

app.use(cors());
app.use(express.json()); // parse JSON bodies for all requests

//get all todos
app.get('/todos', (req, res) => {
  res.json(todos) // parses the string into a JS object
});

//add a new todo
app.post('/todos', (req, res) => {
  const text = req.body.text
  if (!text || typeof text !== 'string') {
    return res.status(400).json({error: 'invalid todo text'});
  }
  const todo = {id: id++, text}; //adding another element into todos array
  todos.push(todo);
  res.status(201).json(todos) // parses the string into a JS object  
});

app.listen(PORT, () => {
  console.log(`backend is listening on ${PORT}`)
});