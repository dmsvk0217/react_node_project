const mysql = require("mysql");
const DBconfig = require("../db/dbconfig");

//mysql db설정
var connection = mysql.createConnection({
  host: DBconfig.HOST,
  port: DBconfig.PORT,
  user: DBconfig.USER,
  password: DBconfig.PASSWORD,
  database: DBconfig.DATABASE,
});

module.exports = connection;
