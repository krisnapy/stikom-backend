import { User } from '../models'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

const AuthController = () => {
  const login = async (req: any, res: any) => {
    try {
      if (!req.body.email)
        return res.status(401).json({ error: { message: 'Please input email', path: 'email' } })

      const userId = await User.findOne({
        where: { email: req.body.email },
        attributes: { exclude: ['token'] },
      })

      if (!userId) return res.status(401).json({ message: 'Not found user email' })

      const matchPass = await argon2.verify(userId.dataValues.password, req.body.password)

      if (!matchPass) return res.status(401).json({ message: 'Wrong password' })

      const refreshToken = jwt.sign({ user: userId.dataValues.id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '5d',
      })

      const accessToken = jwt.sign({ user: userId.dataValues.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '5d',
      })

      await User.update(
        {
          token: refreshToken,
        },
        { where: { id: userId.dataValues.id } }
      )

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })

      res.status(200).json({ user: userId.dataValues, accessToken, refreshToken })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  const me = async (req: any, res: any) => {
    try {
      if (!req.session.userId) return res.status(401).json({ message: 'Login first' })

      const user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: req.session.userId,
        },
      })

      res.status(200).json(user)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  const logout = async (req: any, res: any) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) return res.sendStatus(204)

    const user = await User.findAll({
      where: {
        refresh_token: refreshToken,
      },
    })

    if (!user[0]) return res.sendStatus(204)

    const userId = user[0].dataValues.id

    await User.update(
      { refresh_token: null },
      {
        where: {
          id: userId,
        },
      }
    )
    res.clearCookie('refreshToken')

    res.status(200).json({ message: 'Logout success' })
  }

  return { login, me, logout }
}

export default AuthController
