import Book from '../models/book.js';

export const getList = function (req, res) {
    Book.get_All((data) => {
        res.send({ result: data })
    })
}
export const getDetail = function (req, res) {
    Book.getById(req.params.id, (respone) => {
        res.send({ result: respone });
    })
}

export const addBook = (req, res) => {
    console.log(req);
    var data = req.body
    Book.create(data, respone => {
        res.send({ result: respone })
    })
}

export const deleteBook = (req, res) => {
    var id = req.params.id
    Book.delete(id, respone => {
        res.send({ result: respone })
    })
}

export const updateBook = (req, res) => {
    var data = req.body
    Book.update(data, respone => {
        res.send({ result: respone })
    })
}