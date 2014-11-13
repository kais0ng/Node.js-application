var settings = require('../models/settings');
var mysql = require('mysql');
// create connection pool
var pool = mysql.createPool({
	host : settings.host,
    port : settings.port,
    user : settings.username,
    password : settings.password,
    database : settings.db_name
});
module.exports = pool;