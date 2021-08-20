const mysql = require("mysql");
const Promise = require("bluebird");
require("dotenv").config();

let connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // CONNECTION_LIMIT || 10
  connectionLimit: process.env.CONNECTION_LIMIT || 10,
});

connection = Promise.promisifyAll(connection);
module.exports = connection;
