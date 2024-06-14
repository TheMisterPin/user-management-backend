import request from 'supertest'
import bcrypt from 'bcryptjs'
import app from '../routes/router' // Adjust the path to your app file
import { prisma } from '../controllers/utils'
import { testUser, testFriend } from './mocks' // Adjust the path to your mock file

let token: string

beforeAll(async () => {
  // Ensure test user exists
  await prisma.user.upsert({
    where: { email: testUser.email },
    update: {},
    create: {
      id: testUser.id,
      username: testUser.username,
      email: testUser.email,
      password: await bcrypt.hash(testUser.password, 10),
    },
  })

  const loginResponse = await request(app)
    .post('/auth/login')
    .send({ email: testUser.email, password: testUser.password })

  token = loginResponse.body.accessToken
})

describe('User Management', () => {
  it('should log in an existing user', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      })

    expect(response.status).toBe(200)
    expect(response.body.message).toContain('Welcome Back')
    expect(response.body).toHaveProperty('accessToken')
  })

  it('should add a friend', async () => {
    const response = await request(app)
      .post('/users/add-friend')
      .set('Authorization', token)
      .send({ friendId: testFriend.id })

    expect(response.status).toBe(200)
    expect(response.body.message).toContain('Friend added successfully')
  })

  it('should get user details', async () => {
    const response = await request(app)
      .get(`/users/find/${testFriend.id}`)
      .set('Authorization', token)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id', testFriend.id)
    expect(response.body).toHaveProperty('username', testFriend.username)
  })

  it('should remove a friend', async () => {
    const response = await request(app)
      .delete('/users/remove-friend')
      .set('Authorization', token)
      .send({ friendId: testFriend.id })

    expect(response.status).toBe(200)
    expect(response.body.message).toContain('Friend removed successfully')
  })

  it('should get friends list', async () => {
    const response = await request(app)
      .get('/users/friends')
      .set('Authorization', token)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
  })

  it('should update username', async () => {
    const response = await request(app)
      .put('/users/update-username')
      .set('Authorization', token)
      .send({ newUsername: 'updatedUser' })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Username updated successfully')
    expect(response.body.user).toHaveProperty('username', 'updatedUser')
  })
})
