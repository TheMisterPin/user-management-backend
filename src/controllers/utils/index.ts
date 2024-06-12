import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query'] })

const userExists = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  return user !== null
}
const secret = process.env.JWT_SECRET as string

export { prisma, userExists, secret }
