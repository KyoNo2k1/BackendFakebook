import express from "express";
import { loginUser, getList, getDetailById, addUser, deleteUser, updateUser, getDetailByEmail } from '../controllers/user.js'
import { refreshToken } from '../middleware/auth.js'
const router = express.Router();

router.get('/list', getList)
router.get('/detail/:id', getDetailById)
router.get('/detail', getDetailByEmail)
router.delete('/delete/:id', deleteUser)
router.put('/update', updateUser)

router.post('/signin', loginUser)
router.post('/signup', addUser)
router.post('/refreshToken', refreshToken)

export default router