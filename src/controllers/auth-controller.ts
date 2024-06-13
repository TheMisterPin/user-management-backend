import { Request, Response } from 'express'
import bcrypt, { compareSync } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma, secret } from './utils'

const registerUser = async (req : Request, res : Response) => {
  const { email, password, username } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' })
  }
  const userExists = await prisma.user.findUnique({ where: { email } })

  if (userExists) {
    return res.status(400).json({ error: 'User already exists' })
  }
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    })

    res.status(201).json({ message: 'User registered successfully', user })
  } catch (error) {
    res.status(500).json({ error: 'User registration failed' })
  }
}

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  const userID = user.id

  try {
    const correctPassword = compareSync(password, user.password)

    if (!correctPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    const token = jwt.sign({ userID }, secret, { expiresIn: '15min' })

    res.status(200).json({ message: `Welcome Back ${user.username}`, user, accessToken: token })
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during login' })
  }
}

export { registerUser, loginUser }
