var callisto = require('callisto');
var users = require('./lib/users.js');

callisto.server({
    port: 8090,
    root: 'www'
});

callisto.addModule('users', users);