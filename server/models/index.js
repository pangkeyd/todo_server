const mongoose = require('mongoose')
const URI = process.env.DB_NAME
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

mongoose.connect(URI, { useMongoClient: true })

var todo = new Schema({
  task: {
    type: String,
    index: true,
    unique: true
  },
  status: Number,
  author: String,
  slug: String
})

var Todo = mongoose.model('Todo-p2r', todo)

function getTodo(head, cb){
  let token = head.token
  let decoded = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if(decoded){
      Todo.find({
        author: decoded.username
      }, (err, todo) => {
        if(err){
          res.status(200).send(err)
        }
        cb(todo)
      })
    }
  })
}

function getTodoByID(head, params, cb){
  let token = head.token
  let decoded = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if(decoded){
      Todo.find({
        _id: params._id
      }, (err, todo) => {
        if(err){
          res.status(200).send(err)
        }
        cb(todo)
      })
    }
  })
}

function uniqueTodo(head, params, cb){
  let token = head.token
  let decoded = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if(decoded){
      Todo.find({
        slug: params.slug
      }, (err, todo) => {
        if(err){
          res.status(200).send(err)
        }
        cb(todo)
      })
    }
  })
}

function saveTodo(head, body, cb){
  let token = head.token
  let decoded = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if(decoded){
      let slug = body.task.split(' ').join('-')
      let todoSchema = new Todo({
        task: body.task,
        status: 0,
        author: decoded.username,
        slug: slug
      })
      todoSchema.save((err, todo) => {
        if(err){
          if(err.message.indexOf('task_1') !== -1){
            let errorTask = `Task '${body.task}' already used!`
            cb(null, errorTask)
          }
        }else{
          cb(todo, null)
        }
      })
    }
  })
}

function updateTodo(head, params, body, cb){
  let token = head.token
  let decoded = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if(decoded){
      Todo.update({
        _id: params._id
      }, {
        $set: {
          task: body.task
        }
      }, (err, todo) => {
        if(err){
          if(err.message.indexOf('task_1') !== -1){
            let errorTodo = `Task '${body.task}' already used!`
            cb(null, errorTodo)
          }
        }else{
          Todo.find({
            _id: params._id
          }, (err, todos) => {
            if(err){
              res.status(200).send(err)
            }
            cb(todos, null)
          })
        }
      })
    }
  })
}

function doneTodo(head, params, cb){
  let token = head.token
  let decoded = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if(decoded){
      Todo.update({
        _id: params._id
      }, {
        $set: {
          status: 1
        }
      }, (err, todo) => {
        if(err){
          res.status(200).send(err)
        }else{
          Todo.find({
            _id: params._id
          }, (err, todos) => {
            if(err){
              res.status(200).send(err)
            }
            cb(todos)
          })
        }
      })
    }
  })
}

function deleteTodo(head, params, cb){
  let token = head.token
  let decoded = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if(decoded){
      Todo.remove({
        _id: params._id
      }, (err) => {
        if(err){
          res.status(200).send(err)
        }else{
          let success = `Success Delete ID ${params._id}`
          cb(success)
        }
      })
    }
  })
}

module.exports = {
  getTodo,
  getTodoByID,
  uniqueTodo,
  saveTodo,
  updateTodo,
  doneTodo,
  deleteTodo
}
