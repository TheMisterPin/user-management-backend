import request from 'supertest'
import { mockWarden } from './mocks'
import app from '../src/routes/router.ts'

let accessToken: string

beforeAll(async () => {
  const response = await request(app)
    .post('/auth/login')
    .send({ email: mockWarden.email, password: mockWarden.password })

  accessToken = response.body.accessToken
})
