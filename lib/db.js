'use strict';
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
module.exports = (function () {

    function DB() {
        var db;

        this.find = function (sql, cb) {
            db.all(sql, cb);
        };

        this.insert = function (params, cb) {
            var ph = [], i, stmt, isArray = false;
            try {
                for (i = 0; i < params.fields.length; i++) {
                    ph.push('?');
                }
                stmt = db.prepare('INSERT INTO `' + params.table + '` (`' + params.fields.join('`,`') + '`)' + ' VALUES(' + ph.join(', ') + ') ');
                for (i = 0; i < params.values.length; i++) {
                    if (Array.isArray(params.values[i])) {
                        isArray = true;
                        stmt.run(params.values[i].join(','), cb);
                    }
                }
                if (!isArray) {
                    stmt.run(params.values.join(','), cb);
                }
                stmt.finalize();
            } catch (e) {
                if (typeof cb === 'function') {
                    cb(e);
                } else {
                    console.error(e);
                }
            }
        };

        this.init = function (config) {
            db = new sqlite3.Database(config.location || '/tmp/database.db');
        };
    }


    return new DB();
}());