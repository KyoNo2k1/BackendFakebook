import mysql from 'mysql'

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fakebook'
})

connection.connect(function(err) {
    if (err) console.log("Connect fail");
})

export default connection