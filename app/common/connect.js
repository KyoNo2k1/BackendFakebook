import mysql from 'mysql'

var connection = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6476827',
    password: 'B3hc273VZy',
    database: 'sql6476827'
})
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'fakebook'
// })

connection.connect(function(err) {
    if (err) console.log("Connect fail");
})

export default connection