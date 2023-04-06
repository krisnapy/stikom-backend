import express from 'express'
import UserController from '../controllers/userController'

const router = express.Router()
const { createUser, getUsers } = UserController()

router.get('/users', getUsers)
router.post('/users', createUser)

module.exports = router
