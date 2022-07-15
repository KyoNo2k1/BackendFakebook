import mysql from "mysql";
var connection = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6506657",
  password: "JEyWg9DV8n",
  database: "sql6506657",
});
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "fakebook",
// });

connection.connect(function (err) {
  if (err) console.log("Connect fail");
});

export default connection;
