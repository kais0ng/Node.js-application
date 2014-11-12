/**  
 * Module dependencies.  
 */ 
var express = require('express');
var session = require('express-session')
var partials  = require('express-partials');
var flash = require('connect-flash');
var routes = require('./routes');  
var http = require('http');  
var path = require('path');
 
//load customers route  
var app = express();
 
/**
* Configuration
*/ 
//all environments  
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// flash support
app.configure(function(){
	app.use(session({secret: 'keyboard cat'}))
	app.use(partials());
	app.use(express.bodyParser());
	app.use(express.json());
	app.use(express.methodOverride());
	app.use(flash());
	app.use(function(req, res, next){
		res.locals.user = res.locals.user = req.session ? req.session.user : null;
		res.locals.error = '';
		res.locals.success = '';
		next();
	});
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

//development only  
if ('development' == app.get('env')) {  
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));  
}
//production only
if('production' == app.get('env')){
	app.use(express.errorHandler());
}
/**
* Routes
*/
app.get('/', routes.index);
app.get('/registration', routes.reg);
app.post('/registration', routes.postReg);
app.get('/login', routes.login);
app.post('/login', routes.postLogin);
app.get('/logout', routes.logout);
app.post('/post', routes.post);
app.get('/u/:user', routes.getPosts);
app.listen(9000);
console.log("Express server listening on port in %s mode", app.settings.env);