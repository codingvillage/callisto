'use strict';
var fs = require('fs');
var exec = require('child_process').exec;
var url = require('url');
var http = require('http');
var https = require('https');
var WebSocketServer = require('ws').Server;
var path = require('path');
var querystring = require('querystring');
var include = require('../package.json').include;

module.exports = (function () {

    function WEB() {
        var mime, docroot, modules = {};

        function getMimeType(type) {
            var key;
            if (!mime) {
                mime = require('../var/mime.json');
            }
            for (key in mime) {
                if (mime.hasOwnProperty(key)) {
                    if (mime[key].indexOf(type) > -1) {
                        return key;
                    }
                }
            }
            return 'application/' + type;
        }

        function sendFile(res, pathname) {
            var extension, contentType;
            fs.readFile(pathname, function (err, data) {
                if (err) {
                    res.writeHead(404, {'content-type': 'text/html'});
                    res.write('File not found: ' + pathname);
                    res.end();
                } else {
                    extension = pathname.match(/(\w+)$/)[1].toLowerCase();
                    switch (extension) {
                    case 'js':
                        contentType = 'application/js';
                        break;
                    case 'json':
                        contentType = 'application/json';
                        break;
                    case 'xml':
                        contentType = 'application/xml';
                        break;
                    case 'html':
                        contentType = 'text/html';
                        break;
                    case 'css':
                        contentType = 'text/css';
                        break;
                    case 'png':
                        contentType = 'image/png';
                        break;
                    case 'jpg':
                        contentType = 'image/jpg';
                        break;
                    default:
                        contentType = getMimeType(extension);
                    }
                    res.writeHead(200, {'content-type': contentType});
                    res.write(data);
                    res.end();
                }
            });
        }

        function socketListen(server) {
            new WebSocketServer({
                server: server
            }).on('connection', function (ws) {
                ws.on('message', function (message) {
                    try {
                        var data = JSON.parse(message),
                            params = data.params || null,
                            guid = data.guid;

                        function send(id, data) {
                            ws.send(JSON.stringify({
                                id: id,
                                data: data,
                                timestamp: Date.now()
                            }));
                        }

                        function callback(err, data) {
                            send('api', {
                                guid: guid,
                                data: data,
                                err: (err && typeof err === 'object' ? String(err) : err)
                            });
                        }
                        if (data.module === 'web' && data.method === 'html') {
                            if (!data.params || !data.params.file) {
                                console.error('Missing file name');
                                return;
                            }
                            fs.readFile(docroot + '/' + data.params.file, function (err, data) {
                                callback(err, data ? data.toString() : null);
                            });
                        } else {
                            if (!data.module || !data.method) {
                                console.error('Malformed reqest ' + message);
                                return;
                            }

                            if (!modules.hasOwnProperty(data.module)) {
                                console.error(data.module + ' is not a module');
                                return;
                            }

                            if (!modules[data.module].hasOwnProperty(data.method)) {
                                console.error(data.module + '::' + data.method + ' is not a method');
                                return;
                            }

                            modules[data.module][data.method].call(null, params, callback);
                        }

                    } catch (e) {
                        console.error('Error calling API ' + message + ' .' + e.stack);
                        return;
                    }
                });
            });
        }

        function httpListen(port) {
            var server = http.createServer(function (req, res) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/' || pathname === '/index.html') {
                    sendFile(res, docroot + '/index.html');
                } else if (pathname === '/callisto.js') {
                    sendFile(res, 'node_modules/callisto/' + docroot + '/js/callisto.js');
                } else {
                    sendFile(res, docroot + pathname);
                }
            });

            server.listen(port);
            server.on('error', function (err) {
                console.error('Error caught in http domain:' + err);
            });

            socketListen(server);
        }

        this.request = function (params, cb) {
            var args = url.parse(params.url),
                protocol = args.protocol === 'https' ? https : http;

            protocol.request({
                hostname: args.hostname,
                path: args.path,
                method: params.method || 'POST'
            }, function (res) {
                var body = '';
                res.on('data', function (chunk) {
                    body += chunk;
                });
                res.on('end', function () {
                    cb(null, body);
                });
                res.on('error', function (err) {
                    cb(err.stack || err);
                });
            }).end();
        };

        this.addModule = function (key, module) {
            if (modules.hasOwnProperty(key)) {
                console.error('Module ' + key + ' already exists.');
            } else {
                modules[key] = module;
            }
        };

        this.init = function (config) {
            httpListen(config.port || 8080);
            docroot = config.root || 'www';
        };
    }

    return new WEB();

}());