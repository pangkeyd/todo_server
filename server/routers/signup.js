const express = require('express')
const router = express.Router()
const User = require('../controllers/signup')

router.get('/', User.getData)

router.get('/email/:email', User.getUniqueEmail)

router.get('/username/:username', User.getUniqueUser)

router.post('/', User.saveData)

module.exports = router
