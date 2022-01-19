const express = require('express')
const router = express.Router()
const usersController = require('./users_controller')
const authMiddleware = require('../../middleware/auth')

router.get('/', authMiddleware.userAuthentication, usersController.allUsers)
router.get('/:id', authMiddleware.userAuthentication, usersController.oneUser)
router.post('/', authMiddleware.userAuthentication, usersController.createUser)
router.patch('/:id', authMiddleware.userAuthentication, usersController.updateUser)
router.patch('/change-password/:id', authMiddleware.userAuthentication, usersController.updateUserPassword)
router.delete('/:id', authMiddleware.userAuthentication, usersController.deleteUser)

module.exports = router;