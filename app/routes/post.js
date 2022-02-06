import express from "express";
import { getPost, getDetail, createPost, deletePost, updatePost, likePost, currentLikePost, commentPost, getPostByPage,getCommentByPage,isAuthorPost } from '../controllers/post.js'

const router = express.Router();

// router.get('/getposts', getPost)

router.get('/', getPostByPage)

router.get('/detail/:id', getDetail)

router.post('/', createPost)

router.delete('/delete/:id', deletePost)

router.put('/update', updatePost)

router.post('/likePost', likePost)

router.get('/currentLikePost', currentLikePost)

router.post('/comment', commentPost)

router.post('/getCommentByPage', getCommentByPage)

router.post('/auth', isAuthorPost)

export default router