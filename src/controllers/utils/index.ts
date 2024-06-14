import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query'] })

const userExists = async ({ email } : IUserRequestsProps) => {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  return user !== null
}
const secret = process.env.JWT_SECRET as string

const getUser = async ({ email } : IUserRequestsProps) => {
  await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      username: true,
      friends: true,
    },
  })
}

export {
  prisma, userExists, secret, getUser,
}
