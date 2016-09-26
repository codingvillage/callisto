'use strict';
global.web = require('./lib/web');

var fs = require('fs');
module.exports = (function () {
    process.on('uncaughtException', function (err) {
        console.error(err.stack || err);
    });

    function FW() {
        function init(config, cb) {
            try {
                global.web.init(config || {});
                if (typeof cb === 'function') {
                    cb();
                }
            } catch (e) {
                console.error(e.stack || e);
            }
        }
        return {
            web: global.web,
            init: init
        };
    }
    return new FW();
}());