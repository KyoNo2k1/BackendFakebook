import db from '../common/connect.js'

const Book = function(book){
    this.id = book.id;
    this.bookName = book.bookName;
    this.nameAuthor = book.nameAuthor;
}

Book.get_All = (result) => {
    db.query("SELECT * FROM listBook", ( error,res ) => {
        if (error){
            result(null)
        }
        else result(res)
    })
}
Book.getById = (id, result) => {
    db.query(`SELECT * FROM listBook WHERE id = ${id}`, ( error,res ) => {
        if (error || res.length == 0){
            result(null)
        }
        else result(res[0])
    })
}
Book.create = (newData, result) => {
    db.query("INSERT INTO listBook SET ?", newData, ( error, res ) => {
        if (error){
            result(null)
        }
        else result({id : res.insertId, ...newData})
    })
}
Book.delete = (id, result) => {
    db.query(`DELETE FROM listBook WHERE id = ${id}`, ( error,res ) => {
        if (error || res.length == 0){
            result(null)
        }
        else result(`Delete book id:${id} success`)
    })
}
Book.update = (listData, result) => {
    db.query("UPDATE listBook SET bookName=?,nameAuthor=? WHERE id=?", [listData.bookName, listData.nameAuthor, listData.id], ( error, res ) => {
        if (error){
            result(null)
        }
        else result(listData)
    })
}

export default Book
