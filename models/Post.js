var mysql = require('mysql');

function Post(username, post){
	this.user = username;
	this.post = post;
};
module.exports = Post;

Post.prototype.save = function save(callback){
	var newPost = {
		user: this.user,
		post: this.post,
	};
	var connection = mysql.createConnection({
		host : 'localhost',
		port : '3306',
		user : 'root',
		password : '',
		database : 'nodejs'
	});
	connection.connect();
	connection.query('insert into posts set ?', {
			username : newPost.user,
			post : newPost.post
	}, function(err, fields) {
		callback(err);
	});
	connection.end();
};

Post.get = function get(username, callback){
	var values = [username];
	var connection = mysql.createConnection({
		host : 'localhost',
		port : '3306',
		user : 'root',
		password : '',
		database : 'nodejs'
	});
	connection.connect();
	if(username == null){
		connection.query('select * from posts', function(err, results){
			if(err)
				throw err;
			if(results.length == 0){
				callback(err, null);
				//
			}else{
				var posts = [];
				for(var i=0; i<results.length; i++){
					var item = results[i];
					var post = new Post(item['username'], item['post']);
					posts.push(post);
				}
				callback(err, posts); 
			}
		});
	}else{
		connection.query('select * from posts where username= ?', values, 
		function(err, results, fields){
			if(err)
				throw err;
			if(results.length == 0){
				callback(err, null);
				//
			}else{
				var posts = [];
				for(var i=0; i<results.length; i++){
					var item = results[i];
					var post = new Post(item['username'], item['post']);
					posts.push(post);
				}
				callback(err, posts); 
			}
		});
	}
	connection.end();
};