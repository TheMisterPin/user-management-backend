// user-controller.ts
import { Request, Response } from 'express'
import { prisma } from './utils'

export const addFriend = async (req: Request, res: Response) => {
  const { friendId } = req.body
  const userId = req.user.id

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        friends: {
          connect: { id: friendId },
        },
      },
    })

    res.status(200).json({ message: 'Friend added successfully', user })
  } catch (error) {
    res.status(500).json({ error: 'Failed to add friend' })
  }
}
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany()

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users' })
  }
}
export const removeFriend = async (req: Request, res: Response) => {
  const { friendId } = req.body
  const userId = req.user.id

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        friends: {
          disconnect: { id: friendId },
        },
      },
    })

    res.status(200).json({ message: 'Friend removed successfully', user })
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove friend' })
  }
}
export const getUser = async (req: Request, res: Response) => {
  const userId = req.user.id

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user' })
  }
}
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.user.id

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    await prisma.user.delete({
      where: { id: userId },
    })

    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
}
export const me = async (req: Request, res: Response) => {
  const userID = req.user.id

  if (!userID) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: userID },
      include: {
        friends: true,
      },
    })

    res.status(200).json(currentUser)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user' })
  }
}
export const updateUsername = async (req: Request, res: Response) => {
  const { newUsername } = req.body
  const userId = req.user.id

  if (!newUsername) {
    return res.status(400).json({ error: 'Username is required' })
  }
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { username: newUsername },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json({ message: 'Username updated successfully', user })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update username' })
  }
}

export const getFriends = async (req: Request, res: Response) => {
  const userId = req.user.id

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' })
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: { friends: true },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json(user.friends)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get friends' })
  }
}
