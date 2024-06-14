import { Request, Response } from 'express'
import { prisma } from './utils'

export const addFriend = async (req: Request, res: Response) => {
  const { friendId } = req.body
  const userId: IUser['id'] = req.user.id

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        friends: {
          connect: { id: friendId },
        },
      },
      select: {
        id: true,
        username: true,
        friends: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    })

    res.status(200).json({ message: `Friend added successfully. You have ${user.friends.length} friends.` })
  } catch (error) {
    res.status(500).json({ message: 'Failed to add friend' })
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        friends: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    })

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Failed to get users' })
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
      select: {
        id: true,
        username: true,
        friends: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    })

    res.status(200).json({ message: `Friend removed successfully! You have ${user.friends.length} friends.` })
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove friend' })
  }
}

export const getUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10)

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        friends: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user' })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.user.id

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    })

    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user' })
  }
}

export const me = async (req: Request, res: Response) => {
  const userId = req.user.id

  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        friends: true,
      },
    })

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(currentUser)
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user' })
  }
}

export const updateUsername = async (req: Request, res: Response) => {
  const { newUsername } = req.body
  const userId = req.user.id

  if (!newUsername) {
    return res.status(400).json({ message: 'Username is required' })
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { username: newUsername },
      select: {
        id: true,
        username: true,
        friends: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ message: 'Username updated successfully', user })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update username' })
  }
}

export const getFriends = async (req: Request, res: Response) => {
  const userId = req.user.id

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        friends: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user.friends)
  } catch (error) {
    res.status(500).json({ message: 'Failed to get friends' })
  }
}
