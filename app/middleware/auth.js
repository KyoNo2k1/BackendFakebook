import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const makeToken = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign(   { data: user },
                    process.env.ACCESS_TOKEN_VERIFY,
                    {expiresIn: process.env.TOKEN_TIMEOUT},
                    (err, token) => {
                        if(err) return reject(err)
                        return resolve(token)
                    }
                )
    })
}

export const isAuth =async (req, res, next) => {
    var _token = req.headers.authorization.split(" ")[1];
    console.log("Token: ",_token);
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


