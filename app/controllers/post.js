import Post from '../models/post.js';
import User from '../models/user.js';
import db from '../common/connect.js'

export const getPost = function (req, res) {
    Post.get_All((data) => {
        res.send({ result: data });
    })
}

export const getPostByPage = function (req, res) {

    const { page } = req.query
    db.query("SELECT * FROM posts", ( error, res2) => {
        if (error){
            res.send({ result: "Cant get posts" })
        }
        else {
            const fetchData = async () => {
                try {
                    const LIMIT = 5
                    const startIndex = (Number(page) - 1 ) * LIMIT
                    var newData = res2.reverse().splice(startIndex,LIMIT)
                    res.send({ result: newData, limit: LIMIT })
                } catch (error) {
                    console.log(error);
                }
            }
            fetchData()
        }
    })
}

export const getDetail = function (req, res) {
    Post.getById(req.params.id, (respone) => {
        res.send({ result: respone });
    })
}

export const createPost = (req, res) => {
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

export const getCommentByPage = function (req, res) {
    var postId = req.body.postId
    Post.getCommentByPostId(postId, (respone) => {
        res.send({ result: respone });
    })
}
