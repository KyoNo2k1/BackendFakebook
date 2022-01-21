import express from "express";
import { getPost, getDetail, createPost, deletePost, updatePost, likePost, currentLikePost } from '../controllers/post.js'

const router = express.Router();

router.get('/', getPost)

router.get('/detail/:id', getDetail)

router.post('/', createPost)

router.delete('/delete/:id', deletePost)

router.put('/update', updatePost)

router.get('/currentLikePost', currentLikePost)
router.post('/likePost', likePost)

export default router