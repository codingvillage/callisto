'use strict';
global.web = require('./lib/web');
global.db = require('./lib/db');

var fs = require('fs');
module.exports = (function () {
    process.on('uncaughtException', function (err) {
        console.error(err.stack || err);
    });

    function FW() {
        function init(config, cb) {
            try {
                global.web.init(config.web);
                global.db.init(config.db);
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