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
    db.query("SELECT * FROM posts", ( error,res ) => {
        if (error){
            result("Cant get posts")
        }
        else result(res.reverse())
    })
}
Post.getById = (id, result) => {
    db.query(`SELECT * FROM posts WHERE id = ${id}`, ( error,res ) => {
        if (error || res.length == 0){
            result(null)
        }
        else result(res[0])
    })
}
Post.create = (newData, result) => {
    db.query("INSERT INTO posts SET ?", newData, ( error, res ) => {
        if (error){
            console.log(error);
            result(null)
        }
        else result({id : res.insertId, ...newData})
    })
}
Post.delete = (id, result) => {
    db.query(`DELETE FROM posts WHERE id = ${id}`, ( error,res ) => {
        if (error || res.length == 0){
            result(null)
        }
        else result(`Delete Post id:${id} success`)
    })
}
Post.update = (listData, result) => {
    db.query("UPDATE posts SET nameAuthor=?,message=?,selectedFile=? WHERE id=?", [listData.nameAuthor, listData.message, listData.selectedFile, listData.id], ( error, res ) => {
        if (error){
            result(null)
        }
        else result(listData)
    })
}
Post.liking = (dataLike, result) => {
    db.query("INSERT INTO likes SET ?", dataLike, ( error, res ) => {
        if (error){
            result(null)
        }
        else {
            db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",dataLike.postId, ( error2, res2 ) => {
                result({id : res.insertId, ...dataLike})
            })
        }
    })
}
Post.dislike = (dataLike, result) => {
    db.query("DELETE FROM likes WHERE postId= ?;", dataLike.postId, ( error, res ) => {
        if (error){
            result(null)
        }
        else {
            db.query("UPDATE posts SET likes = likes - 1 WHERE id = ?",dataLike.postId, ( error2, res2 ) => {
                result({id : res.insertId, ...dataLike})
            })
        }
    })
}
Post.like = (dataLike, result) => {
    db.query(`SELECT * FROM likes WHERE postId = ${dataLike.postId} AND userId = ${dataLike.userId}`, ( error,res ) => {
        if (res[0] == undefined){
            Post.liking(dataLike, (respone) => {
                result({status: "Like",data: respone })
            })
        }
        else{
            Post.dislike(dataLike, respone => {
                result({status: "DisLike",data: respone})
            })
        }
    })
}
Post.getLikeById = (id, result) => {
    db.query(`SELECT postId FROM likes WHERE userId = ${id}`, ( error,res ) => {
        var ArrPostLike = []
        for (var i = 0; i < res?.length; i++){
            ArrPostLike.push(res[i]?.postId)
        }
        if (error){
            result(null)
        }
        else result(ArrPostLike)
    })
}
Post.comment = (newData, result) => {
    db.query("INSERT INTO comments SET ?", newData, ( error, res ) => {
        if (error){
            result(null)
        }
        else result({id : res.insertId, ...newData})
    })
}

Post.getCommentByPostId = (arrPostId, result) => {
    db.query(`SELECT * FROM comments where postId in ${arrPostId}`, ( error, res ) => {
        if (error){
            result(null)
        }
        else result(res)
    })
}

export default Post
