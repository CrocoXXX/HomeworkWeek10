const express = require('express')
const router = express.Router()
const authenticationController = require('../controllers/authenticationController')

// Register & Login
router.post('/auth/register', authenticationController.register)

// exports this router to use in our index.js
module.exports = router