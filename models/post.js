var pool = require('../models/dbConnection');

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
	pool.getConnection(function(err, connection){
		connection.query('insert into posts set ?', {
			username : newPost.user,
			post : newPost.post
		}, function(err, result) {
			callback(err);
			connection.release();
		});
	});	
};

Post.get = function get(username, callback){
	var values = [username];
	pool.getConnection(function(err, connection){
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
			connection.release();
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
			connection.release();
		});
	}
	});
};
