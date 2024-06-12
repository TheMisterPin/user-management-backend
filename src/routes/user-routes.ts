import express from 'express'
import { addFriend, removeFriend } from '../controllers/user-controller'

const router = express.Router()

router.post('/add-friend', addFriend)
router.post('/remove-friend', removeFriend)

export default router
