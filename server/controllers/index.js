const todo = require('../models/index')

class Todo {

  static auth(req, res, next){
    if(req.headers.token){
      return next()
    }
    res.send('Login Dulu!')
  }

  static getData(req, res){
    todo.getTodo(req.headers, (result) => {
      res.send(result)
    })
  }

  static getDataByID(req, res){
    todo.getTodoByID(req.headers, req.params, (result) => {
      res.send(result)
    })
  }

  static getUniqueTodo(req, res){
    todo.uniqueTodo(req.headers, req.params, (result) => {
      res.send(result)
    })
  }

  static saveData(req, res){
    todo.saveTodo(req.headers, req.body, (result, auth) => {
      if(result){
        res.send(result)
      }else{
        res.send(auth)
      }
    })
  }

  static updateData(req, res){
    todo.updateTodo(req.headers, req.params, req.body, (result, auth) => {
      if(result){
        res.send(result)
      }else{
        res.send(auth)
      }
    })
  }

  static doneData(req, res){
    todo.doneTodo(req.headers, req.params, (result) => {
      res.send(result)
    })
  }

  static deleteData(req, res){
    todo.deleteTodo(req.headers, req.params, (result) => {
      res.send(result)
    })
  }

}

module.exports = Todo
