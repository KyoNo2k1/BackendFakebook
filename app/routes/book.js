import express from "express";
import { getList, getDetail, addBook, deleteBook, updateBook } from '../controllers/book.js'

const router = express.Router();

router.get('/list', getList)

router.get('/detail/:id', getDetail)

router.post('/add', addBook)

router.delete('/delete/:id', deleteBook)

router.put('/update', updateBook)
export default router