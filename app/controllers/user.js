import User from '../models/user.js'
import { makeToken, checkAuth }  from "../middleware/auth.js"

export const getList = function (req, res) {
    User.get_All((data) => {
        res.send({ result: data })
    })
}
export const getDetail = function (req, res) {
    User.getById(req.params.id, (respone) => {
        res.send({ result: respone });
    })
}

export const addUser = (req, res) => {
    var name = req.body.firstName+ req.body.lastName
    var data = {
        name,
        email: req.body.email,
        password: req.body.password
    }
    User.create(data, respone => {
        res.send({ result: respone })
    })
}

export const deleteUser = (req, res) => {
    var id = req.params.id
    User.delete(id, respone => {
        res.send({ result: respone })
    })
}

export const updateUser = (req, res) => {
    var data = req.body
    User.update(data, respone => {
        res.send({ result: respone })
    })
}

export const loginUser =(req, res) => {
    var data = {
        email: req.body.email,
        password: req.body.password
    }
    User.check_login(data, async respone => {
        if(respone){
            const token = await makeToken(respone)
            res.send({result : token})
        }
    })
}
