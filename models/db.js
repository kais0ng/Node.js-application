var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
    port : '3306', //可以不填写，默认为3306
    user : 'root',
    password : '',
    database : 'nodejs'
});

module.exports = connection;