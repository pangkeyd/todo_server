const mongoose = require('mongoose')
const URI = process.env.DB_NAME
const bcrypt = require('bcrypt')
const saltRounds = 8
const Schema = mongoose.Schema

mongoose.connect(URI, { useMongoClient: true })

var user = new Schema({
  email: {
    type: String,
    index: true,
    unique: true
  },
  username: {
    type: String,
    index: true,
    unique: true
  },
  password: String,
  salt: String
})

var User = mongoose.model('User-todo-p2r', user)

function getUser(cb){
  User.find({}, (err, user) => {
    if(err){
      res.status(200).send(err)
    }
    cb(user)
  })
}

function uniqueEmail(params, cb){
  User.find({
    email: params.email
  }, (err, user) => {
    if(user.length > 0){
      cb(user, null)
    }else{
      let error = `Email ${params.email} not in here!`
      cb(null, error)
    }
  })
}

function uniqueUsername(params, cb){
  User.find({
    username: params.username
  }, (err, user) => {
    if(user.length > 0){
      cb(user, null)
    }else{
      let error = `Username ${params.username} not in here!`
      cb(null, error)
    }
  })
}

function saveUser(body, cb){
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(body.pass, salt, (err, hash) => {
      let userSchema = new User({
        email: body.email,
        username: body.user,
        password: hash,
        salt: hash
      })
      userSchema.save((err, user) => {
        if(!err){
          cb(user, null)
        }else if(err){
          if(err.message.indexOf('email_1') !== -1){
            let errorEmail = `Email '${body.email}' already used!`
            cb(null, errorEmail)
          }else if(err.message.indexOf('username_1') !== -1){
            let errorUser = `Username '${body.user}' already used!`
            cb(null, errorUser)
          }
        }else{
          res.status(200).send(err)
        }
      })
    })
  })
}

module.exports = {
  User,
  getUser,
  uniqueEmail,
  uniqueUsername,
  saveUser
}
