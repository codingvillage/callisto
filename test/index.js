'use strict';
var callisto = require('callisto');
var users = require('./lib/users.js');
var sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('database.db3');


callisto.server(null, function (err) {
    if (!err) {
        callisto.addModule('users', users);
    }
});