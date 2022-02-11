import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import jwt_decode from "jwt-decode";
import User from "../models/user.js"

dotenv.config()

export const makeToken = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign(   { data: user },
                    process.env.ACCESS_TOKEN_VERIFY,
                    {expiresIn: '7d'},
                    (err, token) => {
                        if(err) return reject(err)
                        return resolve(token)
                    }
                )
    })
}

export const isAuth =async (req, res, next) => {
    var _token = req.headers.authorization?.split(" ")[1];
    if (_token) {
        try {
            var userVerify = await jwt.verify(_token,process.env.ACCESS_TOKEN_VERIFY)
            req.user = userVerify.data
            next()
        } catch (error) {
            return res.send({data: "Invalid token"})
        }
    }
    else {
        return res.send({data: "Dont have token"})
    }
}
export const  makeTokenRefresh = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign(   { data: user },
                    process.env.REFRESH_TOKEN_VERIFY,
                    {expiresIn: '30d'},
                    async (err, token) => {
                        console.log({user});
                        if(err) return reject(err)
                        var data = {
                            userEmail: user.email,
                            refToken: token
                        }
                        await User.add_refresh_token(data,respone => {
                            console.log({respone});
                        })
                        return resolve(token)
                    }
                )
    })
}
export const refreshToken =async (req, res,next) => {
    const refreshToken = req.body.token
    const user = req.body.user
    if(!refreshToken) res.send({ data: "Dont have refresh token"})
    User.get_refresh_token(user, respone => {
        var refreshTokens = []
        respone.map(token =>refreshTokens.push(token.refToken))
        if(!refreshTokens.includes(refreshToken)) res.send({ data: "Wrong refresh token"})
        next()
    })
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_VERIFY, (err,data) => {
        if(err) res.send({err,data: "Can't verify refresh token"})
        const accessToken = jwt.sign({data: {name: data.data.name, email: data.data.email}},process.env.ACCESS_TOKEN_VERIFY,{
            expiresIn: '7d',
        })
        const valueExp = jwt_decode(accessToken)
        res.json({ accessToken, exp: valueExp.exp })
    })
}
