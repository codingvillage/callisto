'use strict';
var web = require('./lib/web');
var db = require('./lib/db');

var fs = require('fs');
module.exports = (function () {
    process.on('uncaughtException', function (err) {
        console.error(err.stack || err);
    });

    function FW() {
        function init(config, cb) {
            try {
                web.init(config.webport || 8080, config.wsport || 8080);
                db.init();
                if (typeof cb === 'function') {
                    cb();
                }
            } catch (e) {
                console.error(e.stack || e);
            }
        }
        return {
            web: web,
            db: db,
            init: init
        };
    }
    return new FW();
}());