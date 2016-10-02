'use strict';
var web = require('./lib/web');

var fs = require('fs');
module.exports = (function () {
    process.on('uncaughtException', function (err) {
        console.error(err.stack || err);
    });

    function FW() {
        function server(config, cb) {
            try {
                web.init(config || {});
                if (typeof cb === 'function') {
                    cb();
                }
            } catch (e) {
                console.error(e.stack || e);
                cb(e);
            }
        }
        return {
            web: web,
            server: server,
            addModule: web.addModule
        };
    }
    return new FW();
}());