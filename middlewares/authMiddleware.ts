import { User } from '../models'

export const AuthMiddleware = () => {
  const loginMiddleware = async (req: any, res: any, next: any) => {
    if (!req.session.userId) return res.status(401).json({ message: 'Please login first' })

    const user = await User.findOne({ where: { id: req.session.userId } })

    if (!user) return res.status(402).json({ message: `Can't find this user` })

    req.user = user.dataValues

    res.status(200).json({ message: 'Success' })
    next()
  }

  const adminMiddleware = async (req: any, res: any, next: any) => {
    loginMiddleware(req, res, function() {
      if (req.user.role !== 'admin') return res.status(402).json({ message: `Can't access this page` })

      next()
    })
  }

  return { loginMiddleware, adminMiddleware }
}
