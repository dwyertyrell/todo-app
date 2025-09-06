const {addTodoData, getAllTodosData} = require('../../backend/src/data/todoStore')
const {createTodoController,} = require('../../backend/src/controllers/todosController')

const todos = getAllTodosData()
function mockResponse() {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

describe('Add Todo Controller', () => {

  test('User adds a valid todo item', () => {
    const req = {body: {text: 'buy milk'}}
    const res = mockResponse()  
  
    createTodoController(req, res) 
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining({text: 'buy milk'}),
        error: null,
        message: expect.any(String)
      })
    )
    expect(todos.map(todo => todo.text)).toContain('buy milk')
  })


  test('User tries to add an empty todo item', () => {
    const req = {body: {text: ''}}
    const res = mockResponse()

    createTodoController(req, res) 
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      data: null,
      error: expect.any(String), 
      message:expect.any(String)
    })
    expect(todos.map(todo => todo.text)).not.toContain('')
  })
})