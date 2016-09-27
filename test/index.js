var callisto = require('callisto');
var users = require('./lib/users.js');

global.web.addModule('users', users);
callisto.init({
    port: 8090,
    root: 'www'
});