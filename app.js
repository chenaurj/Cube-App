var express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	app = express(),
	_ = require('underscore'),
	BackBone = require('backbone'),
	HandleBars = require('express3-handlebars'),
	mysql = require('mysql');


var connection = mysql.createConnection({
 	host : 'localhost',
 	user : 'root',
 	password : 'anger'
 });

connection.connect();
connection.query('USE cubemanager');

var cleanInput = function(string){
	var ans = string;
	ans = ans.replace(/;/, '');
	ans = ans.replace(/!/, '');
	ans = ans.replace(/,/, '');
	ans = ans.replace(/=/, '');
	ans = ans.replace(/</, '');
	ans = ans.replace(/>/, '');
	ans = ans.replace(/\./, '');	
	return ans;
};


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


	app.get('/cubes', function(req, res){
		console.log('At cubes');
		connection.query('SELECT * FROM cube', function(err, rows, fields){
			if(err){
				throw err;
			}
			res.contentType('application/json');
			res.write(JSON.stringify(rows));
			res.end();
		});
	});

	app.get('/cube/:id', function(req, res){
		var clean = cleanInput(req.params.id);
		console.log('At cube/' + clean);
		connection.query('SELECT * FROM cube WHERE id = ' + clean, function(err, rows, fields){
			if(err){
				throw err;
			}
			res.contentType('application/json');
			res.write(JSON.stringify(rows));
			res.end();
		});
	});

	app.get('/cards', function(req, res){
		console.log('At cards');
		connection.query('SELECT * FROM card', function(err, rows, fields){
			if(err){
				throw err;
			}
			res.contentType('application/json');
			res.write(JSON.stringify(rows));
			res.end();
		});
	});

	app.get('/card/:id', function(req, res){
		var clean = cleanInput(req.params.id);
		console.log('At card/' + clean);
		connection.query('SELECT * FROM card WHERE id = ' + clean, function(err, rows, fields){
			if(err){
				throw err;
			}
			res.contentType('application/json');
			res.write(JSON.stringify(rows));
			res.end();
		});
	});


	app.listen(port);
	console.log('Listening on port %d', port);
};



var start = new App();

