const mysql = require('promise-mysql');
 
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password123#',
  database: 'signalrdb'
});
 
function getConnection() {
  return connection;
}
 
module.exports = { getConnection };