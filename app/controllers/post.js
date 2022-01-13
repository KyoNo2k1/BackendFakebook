import Post from '../models/post.js';

export const getList = function (req, res) {
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
    var newData = {...data, nameAuthor: req.user.name,createdAt: new Date().toISOString()}
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