const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'test_compliation'
})

module.exports = connection;

