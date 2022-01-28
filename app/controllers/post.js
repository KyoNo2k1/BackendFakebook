import Post from '../models/post.js';
import User from '../models/user.js';

export const getPost = function (req, res) {
    Post.get_All((data) => {
        res.send({ result: data })
    })
}
export const getDetail = function (req, res) {
    Post.getById(req.params.id, (respone) => {
        res.send({ result: respone });
    })
}

export const  createPost = (req, res) => {
    var data = req.body
    var newData = {...data, nameAuthor: req?.user?.name,createdAt: new Date().toISOString()}
    Post.create(newData, respone => {
        res.send({ data: respone })
    })
}

export const deletePost = (req, res) => {
    var id = req.params.id
    Post.delete(id, respone => {
        res.send({ result: respone })
    })
}

export const updatePost = (req, res) => {
    var data = req.body
    Post.update(data, respone => {
        res.send({ result: respone })
    })
}

export const likePost = (req, res) => {
    User.getByEmail(req.body.userLiking.email, (respone) => {
        var dataLike = {
            userLiking: req.body.userLiking.name,
            postId: req.body.postId,
            userId: respone.id
        }
        Post.like(dataLike, (respone2) => {
            res.send({ data: respone2 })
        })
    })
}
export const currentLikePost = (req, res) => {
    User.getByEmail(req.user.email, (idUser) => {
        Post.getLikeById(idUser?.id, (respone2) => {
            res.send({ result: respone2 });
        })
    })
}
export const commentPost = (req, res) => {
    User.getByEmail(req.user.email, (emailUser) => {
        var data = req.body
        var newData = {...data, emailUser:emailUser.name, createdAt: new Date().toISOString()}
        Post.comment(newData, respone => {
            res.send({ data: respone })
        })
    })
}
export const getCommentPost = (req, res) => {
    var postId = req.params.postId
    Post.getCommentById(postId, respone => {
        res.send({ result: respone })
    })
}
