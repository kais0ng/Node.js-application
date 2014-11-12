var mysql = require('mysql');
// create connection pool
var pool = mysql.createPool({
	host : 'localhost',
    port : '3306',
    user : 'root',
    password : '',
    database : 'nodejs'
});
module.exports = pool;