'use strict';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db3');
module.exports = (function () {

    function USER_MODEL() {
        this.getAllUsers = function (callback) {
            if (typeof callback === 'function') {
                db.all("SELECT * FROM users", callback);
            }
        };
    }

    return new USER_MODEL();
}());

