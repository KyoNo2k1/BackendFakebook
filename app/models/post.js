import db from '../common/connect.js'

const Post = function(post){
    this.id = post.id;
    this.nameAuthor = post.nameAuthor;
    this.message = post.message;
    this.selectedFile = post.selectedFile;
    this.like = post.like;
    this.comment = post.comment;
}

Post.get_All = (result) => {
    db.query("SELECT * FROM fakebook", ( error,res ) => {
        if (error){
            result(null)
        }
        else result(res)
    })
}
Post.getById = (id, result) => {
    db.query(`SELECT * FROM fakebook WHERE id = ${id}`, ( error,res ) => {
        if (error || res.length == 0){
            result(null)
        }
        else result(res[0])
    })
}
Post.create = (newData, result) => {
    db.query("INSERT INTO fakebook SET ?", newData, ( error, res ) => {
        if (error){
            result(null)
        }
        else result({id : res.insertId, ...newData})
    })
}
Post.delete = (id, result) => {
    db.query(`DELETE FROM fakebook WHERE id = ${id}`, ( error,res ) => {
        if (error || res.length == 0){
            result(null)
        }
        else result(`Delete Post id:${id} success`)
    })
}
Post.update = (listData, result) => {
    db.query("UPDATE fakebook SET nameAuthor=?,message=?,selectedFile=? WHERE id=?", [listData.nameAuthor, listData.message, listData.selectedFile, listData.id], ( error, res ) => {
        if (error){
            result(null)
        }
        else result(listData)
    })
}

export default Post
