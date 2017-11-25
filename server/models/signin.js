const mongoose = require('mongoose')
const URI = process.env.DB_NAME
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./signup')

mongoose.connect(URI, { useMongoClient: true })

function getUser(cb){
  User.User.find({}, (err, user) => {
    if(err){
      res.status(200).send(err)
    }
    cb(user)
  })
}

function signIn(body, cb){
  User.User.find({
    username: body.user
  }, (err, user) => {
    if(!err){
      if(user.length > 0){
        let resPass = bcrypt.compareSync(body.pass, user[0].password)
        if(resPass){
          let obj = {
            id: user[0]._id,
            username: user[0].username
          }
          let token = jwt.sign(obj, process.env.SECRET_KEY)
          cb(token, null)
        }else{
          let wrong = 'Username atau Password Salah!'
          cb(null, wrong)
        }
      }else{
        let wrong = 'Username atau Password Salah!'
        cb(null, wrong)
      }
    }
  })
}

function signInFB(body, cb){
  User.User.find({
    email: body.email
  }, (err, user) => {
    if(!err){
      if(user.length > 0){
        let obj = {
          id: user[0]._id,
          username: user[0].username
        }
        let token = jwt.sign(obj, process.env.SECRET_KEY)
        cb(token, null)
      }else{
        let wrong = 'Username atau Password Salah!'
        cb(null, wrong)
      }
    }
  })
}

module.exports = {
  getUser,
  signIn,
  signInFB
}
