const express = require('express')
const router = express.Router()
const Todo = require('../controllers/index')

router.get('/', Todo.auth, Todo.getData)

router.get('/:_id', Todo.auth, Todo.getDataByID)

router.get('/todo/:slug', Todo.auth, Todo.getUniqueTodo)

router.post('/', Todo.auth, Todo.saveData)

router.put('/:_id', Todo.auth, Todo.updateData)

router.get('/done/:_id', Todo.auth, Todo.doneData)

router.delete('/delete/:_id', Todo.auth, Todo.deleteData)

module.exports = router
