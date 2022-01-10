import express from 'express';
import postRouter from './app/routes/post.js'
import userRouter from './app/routes/user.js'
import cors from 'cors'
import bodyParser from 'body-parser'

import {isAuth} from './app/middleware/auth.js'
var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/user', userRouter)

app.use(isAuth)

app.use('/post', postRouter)

const PORT = 5000
app.listen(PORT, function(){
    console.log("Server listening on port " + PORT);
})