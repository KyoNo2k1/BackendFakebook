import express from "express";
import { loginUser, getList, getDetail, addUser, deleteUser, updateUser } from '../controllers/user.js'

const router = express.Router();

router.get('/list', getList)
router.get('/detail/:id', getDetail)
router.delete('/delete/:id', deleteUser)
router.put('/update', updateUser)

router.post('/signin', loginUser)
router.post('/signup', addUser)
export default router