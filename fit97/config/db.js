const mysql = require('mysql2');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'database_development_fit97',
    port: '8889'
  });

  connection.connect();

  module.exports = connection;