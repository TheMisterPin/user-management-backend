import express from 'express'
import {
  addFriend, removeFriend, deleteUser, getUser, getUsers, getFriends, updateUsername, me,
} from '../controllers/user-controller'

const router = express.Router()

router.post('/add-friend', addFriend)
router.delete('/remove-friend', removeFriend)
router.delete('/', deleteUser)
router.get('/', me)
router.get('/all', getUsers)
router.get('/friends', getFriends)
router.put('/update-username', updateUsername)
router.get('/find/:id', getUser)

export default router
