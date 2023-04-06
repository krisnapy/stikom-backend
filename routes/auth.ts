import express from 'express'
import AuthController from '../controllers/authController'

const router = express.Router()
const { login, me, logout } = AuthController()

router.post('/login', login)
router.get('/profile', me)
router.delete('/logout', logout)

module.exports = router
