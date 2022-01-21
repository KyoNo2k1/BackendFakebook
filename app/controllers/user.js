import User from '../models/user.js'
import { makeToken }  from "../middleware/auth.js"
import bcrypt  from "bcryptjs"

export const getList = function (req, res) {
    User.get_All((data) => {
        res.send({ result: data })
    })
}
export const getDetailById = function (req, res) {
    User.getById(req.params.id, (respone) => {
        res.send({ result: respone });
    })
}
export const getDetailByEmail = function (req, res) {
    var email = req.body.email
    User.getByEmail(email, (respone) => {
        res.send({ result: respone });
    })
}

export const addUser =async (req, res) => {
    var name = req.body.firstName + " " + req.body.lastName
    var hashPassword = await bcrypt.hash(req.body.password, 12)
    var data = {
        name,
        email: req.body.email,
        password: hashPassword,
        selectedFile: ''
    }
    User.create(data, respone => {
        res.send({ data: respone })
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

export const loginUser =async (req, res) => {
    var data = {
        email: req.body.email,
        password: req.body.password
    }
    User.check_login(data, async respone => {
        if(respone!=null){
            const token = await makeToken(respone)
            res.send({result : token,data : respone})
        }
    })
}
