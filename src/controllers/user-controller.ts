// user-controller.ts
import { Request, Response } from 'express'
import { prisma } from './utils'

export const addFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.body

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

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.user.id

  try {
    await prisma.user.delete({
      where: { id: userId },
    })

    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
}

export const updateUsername = async (req: Request, res: Response) => {
  const { newUsername } = req.body
  const userId = req.user.id

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { username: newUsername },
    })

    res.status(200).json({ message: 'Username updated successfully', user })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update username' })
  }
}

export const getFriends = async (req: Request, res: Response) => {
  const { userId } = req.query

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
