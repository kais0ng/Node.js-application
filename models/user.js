var pool = require('../models/dbConnection');

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
	var insertionData = [newuser.name, newuser.password];
	pool.getConnection(function(err, connection){
	
		connection.query('INSERT INTO users(name, password) VALUES(?,?)', 
		insertionData, function(err, result) {
			callback(err);
			connection.release();
		});
	});
}

User.get = function get(username, password, callback){
	var values = [username, password];
	pool.getConnection(function(err, connection){
		connection.query('select * from users where name= ? and password = ?', values, function(err, results){
			if(err)
				throw err;
			if(results.length == 0){
				callback(err, null);
				console.log('the user does not exit.');
			}else{
				console.log(results);
				var user = new User({
					name: username,
					password: password,
				});
				callback(err, user); 
			}
			connection.release();
		});
	});
}


