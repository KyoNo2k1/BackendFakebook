import express from 'express';
import postRouter from './app/routes/post.js'
import userRouter from './app/routes/user.js'
import cors from 'cors'
import bodyParser from 'body-parser'

import {isAuth} from './app/middleware/auth.js'
var app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use('/users', userRouter)

app.use('/posts',isAuth, postRouter)

const PORT =process.env.PORT || 5000
app.listen(PORT, function(){
    console.log("Server listening on port " + PORT);
})