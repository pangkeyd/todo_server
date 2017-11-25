const express = require('express')
const router = express.Router()
const User = require('../controllers/signin')

router.get('/', User.getData)

router.post('/', User.signIn)

router.post('/fb', User.signInFB)

module.exports = router
