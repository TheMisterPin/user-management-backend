import express from 'express'
import authRoutes from './auth-routes'
import userRoutes from './user-routes'
import authMiddleware from '../middleware/auth-middleware'

const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', authRoutes)
app.use('/users', userRoutes, authMiddleware)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
export default app
