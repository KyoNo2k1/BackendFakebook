import express from "express";
import { getList, getDetail, createPost, deletePost, updatePost } from '../controllers/post.js'

const router = express.Router();

router.get('/', getList)

router.get('/detail/:id', getDetail)

router.post('/', createPost)

router.delete('/delete/:id', deletePost)

router.put('/update', updatePost)
export default router