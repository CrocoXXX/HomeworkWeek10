const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// CRUD User
router.get('/users', userController.getAllUsers)
router.get('/users/paginate', userController.getUsersByPaginate)
router.get('/users/:id', userController.getUserById)
// router.post('/users', userController.createUsers)
router.put('/users/:id', userController.updateUsers)
router.delete('/users/:id', userController.deleteUsers)

// exports this router to use in our index.js
module.exports = router