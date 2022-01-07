import db from '../common/connect.js'

const User = function(user){
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
}

User.get_All = (result) => {
    db.query("SELECT * FROM users", ( error,res ) => {
        if (error){
            result(null)
        }
        else result(res)
    })
}
User.getById = (id, result) => {
    db.query(`SELECT * FROM users WHERE id = ${id}`, ( error,res ) => {
        if (error || res.length == 0){
            result(null)
        }
        else result(res[0])
    })
}
User.create = (newData, result) => {
    db.query("INSERT INTO users SET ?", newData, ( error, res ) => {
        if (error){
            result("User exists")
        }
        else result({id : res.insertId, ...newData})
    })
}
User.delete = (id, result) => {
    db.query(`DELETE FROM users WHERE id = ${id}`, ( error,res ) => {
        if (error || res.length == 0){
            result(null)
        }
        else result(`Delete User id:${id} success`)
    })
}
User.update = (listData, result) => {
    db.query("UPDATE users SET name=?,email=?,password=? WHERE id=?", [listData.name, listData.email, listData.password, listData.id], ( error, res ) => {
        if (error){
            result(null)
        }
        else result(listData)
    })
}
User.check_login = (data, result) => {
    db.query(`SELECT * FROM users WHERE email=? AND password=?`,[data.email, data.password], ( error,res ) => {
        if (error || res.length == 0){
            result(null)
        }
        else result(res[0])
    })
}

export default User
