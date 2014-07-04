//this file sets the configuration of the database. It should not need to be changed during development. 
var mysql = require('mysql');

var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'temporary password',
    database : 'cube'
});

exports.pool = pool;
