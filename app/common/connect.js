import mysql from 'mysql'
    // var connection = mysql.createConnection({
    //     host: 'sql6.freesqldatabase.com',
    //     user: 'sql6480060',
    //     password: 'gbZttuf9dj',
    //     database: 'sql6480060'
    // })
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'fakebook'
// })
var connection = mysql.createConnection({
    host: 'h21665.tino.org',
    user: 'wjpukico_wjpuki',
    password: 'Nghialop12a15',
    database: 'wjpukico_wjpuki'
})


connection.connect(function(err) {
    if (err) console.log("Connect fail");
})

export default connection