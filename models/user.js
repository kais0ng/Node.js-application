var mysql = require('mysql');

function User(user){
	this.name = user.name;
	this.password = user.password;
};
module.exports = User;

User.prototype.save = function save(callback){
	var newuser = {
		name: this.name,
		password: this.password,
	};
	var connection = mysql.createConnection({
		host : 'localhost',
		port : '3306', //可以不填写，默认为3306
		user : 'root',
		password : '',
		database : 'nodejs'
	});
	connection.connect();
	connection.query('insert into users set ?', {
			name : this.name,
			password : this.password
	}, function(err, fields) {
		callback(err);
		console.log('Insert is success.');
		//req.flash('info','User created');
	});
	connection.end();
}

User.get = function get(username, password, callback){
	var values = [username, password];
	var connection = mysql.createConnection({
		host : 'localhost',
		port : '3306',
		user : 'root',
		password : '',
		database : 'nodejs'
	});
	connection.connect();
	connection.query('select * from users where name= ? and password = ?', values, 
	function(err, results, fields){
		if(err)
			throw err;
		if(results.length == 0){
			callback(err, null);
			console.log('the user does not exit.');
		}else{
			var user = new User({
				name: username,
				password: password,
			});
			callback(err, user); 
		}
	});
	connection.end();
}


