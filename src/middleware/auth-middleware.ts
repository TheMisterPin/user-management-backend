import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { prisma, secret } from '../controllers/utils'

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing or invalid' })
  }

  try {
    const decoded: any = jwt.verify(token, secret)
    const user = await prisma.user.findUnique({ where: { id: decoded.userID } })

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden' })
  }
}

export default authMiddleware
