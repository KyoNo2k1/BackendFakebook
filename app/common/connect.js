import mysql from 'mysql'

var connection = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6479342',
    password: 'Qm2hrkbip8',
    database: 'sql6479342'
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