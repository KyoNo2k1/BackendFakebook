import mysql from 'mysql'
    var connection = mysql.createConnection({
        host: 'sql6.freesqldatabase.com',
        user: 'sql6483721',
        password: '3c6diMm9SJ',
        database: 'sql6483721'
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