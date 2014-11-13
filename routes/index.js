/* GET home page. */
var mysql = require('mysql');
var User = require('../models/user.js');
var Post = require('../models/post.js');
exports.index = function(req, res){
	Post.get(null, function(err, posts){
		if(err){
			posts = [];
		}
		res.render('index', {
			title: 'Home',
			posts: posts,
		});
	});
};

exports.reg = function(req, res){
	res.render('registration', {title:'Registration'});
};

exports.postReg = function(req, res){
	if(req.body['password'] != req.body['password-repeat']){
		req.flash('error', '两次输入的口令不一致');
		return res.redirect('/registration');
	}
	var newUser = new User({
		name: req.body.username,
		password: req.body.password,
	});
	newUser.save(function(err){
		if(err){
			req.flash('error', err);
			return res.redirect('/registration');
		}
		req.session.user = newUser;
		req.flash('success', '注册成功.');
		res.redirect('/');
	});
};

exports.login = function(req, res){
	res.render('login', {title:'Login'});
};

exports.postLogin = function(req, res){
	User.get(req.body.username, req.body.password, function(err, user){
		if(!user){
			req.flash('error', '用户不存在');
			return res.redirect('/login');
		}
		req.session.user = user;
		console.log(user.name + ' 登录成功.');
		res.redirect('/');
	});
};
exports.logout = function(req, res){
	req.session.user = null;
	req.flash('success', '登出成功');
	res.redirect('/');
};

exports.post = function(req, res){
	var currentUser = req.session.user;
	var post = new Post(currentUser.name, req.body.post);
	post.save(function(err){
		if(err){
			req.flash('error', err);
			return res.redirect('/');
		}
		req.flash('success', '发表成功.');
		console.log('发表成功');
		res.redirect('/u/' + currentUser.name);
	});
};
exports.getPosts = function(req, res){
	var username = req.params.user;
	Post.get(username, function(err, posts) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/');
			}
			res.render('user', {
				title: username,
				posts: posts,
			});
		});
};