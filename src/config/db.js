const mysql = require('mysql');
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = require('../../env');

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME
});

connection.connect((error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Connected to Database!');
  }
});

module.exports = connection;
