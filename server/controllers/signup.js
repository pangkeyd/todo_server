const user = require('../models/signup')

class User {

  static getData(req, res){
    user.getUser(result => {
      res.send(result)
    })
  }

  static getUniqueEmail(req, res){
    user.uniqueEmail(req.params, (result, auth) => {
      if(result){
        res.send(result)
      }else{
        res.send(auth)
      }
    })
  }

  static getUniqueUser(req, res){
    user.uniqueUsername(req.params, (result, auth) => {
      if(result){
        res.send(result)
      }else{
        res.send(auth)
      }
    })
  }

  static saveData(req, res){
    user.saveUser(req.body, (result, auth) => {
      if(result){
        res.send(result)
      }else{
        res.send(auth)
      }
    })
  }

}

module.exports = User
