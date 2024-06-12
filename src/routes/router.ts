import express from 'express'
import authRoutes from './auth-routes'
import userRoutes from './user-routes'

const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', authRoutes)
app.use('/users', userRoutes)

export default app
