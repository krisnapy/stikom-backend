import { User } from '../models'

const UserController = () => {
  const argon2 = require('argon2')

  const getUsers = async (_req: any, res: any) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
      })

      res.status(200).json(users)
    } catch (error: any) {
      res.status(500).json(error)
    }
  }

  const createUser = async (req: any, res: any) => {
    const {
      user: { username, email, password, role },
    } = req.body

    const hashPassword = await argon2.hash(password)

    try {
      await User.create({
        username: username,
        email: email,
        password: hashPassword,
        role: role,
      })

      res.status(200).json({ message: 'Regiter success' })
    } catch (error: any) {
      res.status(500).json({ message: error.errors, field: error.fields })
    }
  }

  return { getUsers, createUser }
}
export default UserController
