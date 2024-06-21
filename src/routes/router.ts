import express from 'express'
import cors from 'cors'
import authRoutes from './auth-routes'
import userRoutes from './user-routes'
import authMiddleware from '../middleware/auth-middleware'

const app = express()

const corsOptions = {
  origin: ['http://localhost:5173','https://user-management-frontend-inky.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/users', [authMiddleware], userRoutes)

export default app
