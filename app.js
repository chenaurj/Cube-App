var express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	app = express(),
	_ = require('underscore'),
	BackBone = require('backbone'),
	HandleBars = require('express3-handlebars'),
	mysql = require('mysql');
/*	MySQLStore = require('connect-mysql')(express),
 	database = require('./database');*/


 var connection = mysql.createConnection({
 	host : 'localhost',
 	user : 'root',
 	password : 'anger'
 });

 connection.connect();


var App = function() {
	app.engine('.hbs', HandleBars({
		extname: '.hbs',
		//defaultLayout: 'home',
		layoutsDir: './views/'
	}));

	var port = 3000;

	app.use(express.static(__dirname + '/resources'));

	app.set('view engine', '.hbs');

	app.get('/', function(req, res){
		console.log('At home page');
		res.render('home.hbs');
	});

	app.get('/thanks', function(req, res){
		console.log('At thanks page');
		res.render('thanks.hbs');
	});

	app.get('/test', function(req, res){
		console.log('At test');
		connection.query('use cube');
		connection.query('SELECT name, num FROM test', function(err, rows, fields){
			if(err) throw err;
			console.log('The solution is: ' + rows[0].num);
		});
	});

	app.get('/hello.txt', function(req,res){
		res.send('Hello World');
	});

	app.listen(port);
	console.log('Listening on port %d', port);
};



var start = new App();

