# Fast and lean [Node.js] MVC framework for single page applications.

### Installation
```sh
$ npm install -save callisto
```
### Usage
```javascript
var callisto = require('callisto');
callisto.server();
```
### Configuration
```javascript
callisto.server({
    port: 8080, // Used for both http and websockets
    root: 'www' // Public web directory
});
```
### Controller
To declare a controller, simply require the library and add it to modules. All the controller's public methods are accessible from the client.
```javascript
var users = require('./lib/users.js');
callisto.addModule('users', users);
```
### Controller Example
```javascript
'use strict';
var userModel = require('./user-model.js');
module.exports = (function () {

    function USERS() {
        this.getUsers = function (params, callback) {
            userModel.getAllUsers(callback);
        };
    }

    return new USERS();
}());
```
### Model
Callisto doesn't impose any restrictions on how the model is defined. Tipically in an MVC setup, a model represents a single data object entity, and provides a database interface to the controller.
A controller can simply be require a model library and call the public methods.

### Model Example
```javascript
'use strict';
module.exports = (function () {
    function USER_MODEL() {
        this.getAllUsers = function (callback) {
            if (typeof callback === 'function') {
                global.db.all("SELECT * FROM users", callback);
            }
        };
    }
    
    return new USER_MODEL();
}());
```

### Client Side
  - Put all the client files in the `root` directory, delacred in the server configurations. The default root is `www`.
  - Create an index.html in the root directory
  - Callisto requires [jQuery]
  - Include `callisto.js` in index.html.
  > Don't use the full path when including callisto.js, the server knows how to find it.
 ```html
 <script type="text/javascript" src="callisto.js"></script>
 ```
 
 ### index.html Example
 ```html
 <!doctype html>
<html>
    <head>
        <title>Callisto Test APP</title>
        <link rel="stylesheet" type="text/css" href="css/main.css"/>
        <style type="text/css">
            body {
                margin: 10px 20px;
            }
        </style>
    </head>
    <body>
        <h3 class="menu">
            <a href="#" id="home">Home</a>&nbsp;&nbsp;
            <a href="#" id="users">Users</a>&nbsp;&nbsp;
            <a href="#" id="rabbit">Rabbit</a>
        </h3>
        <div class="content" id="content"></div>
    </body>
</html>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="callisto.js"></script>
<script type="text/javascript" src="js/main-ws.js"></script>
 ```
### Client controller
- A client side controller is any javascript included in index.html. 
- Wrap the scope with `window.ready` function. The ready function guarantees that the document is ready and the websocket is connected. 
> Currently, when the client is disconnected the page needs to be refreshed. In the future, this will be handled by the framework.


Dillinger uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Ace Editor] - awesome web-based text editor
* [markdown-it] - Markdown parser done right. Fast and easy to extend.
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Gulp] - the streaming build system
* [keymaster.js] - awesome keyboard handler lib by [@thomasfuchs]
* [jQuery] - duh

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

### Installation

Dillinger requires [Node.js](https://nodejs.org/) v4+ to run.

Download and extract the [latest pre-built release](https://github.com/joemccann/dillinger/releases).

Install the dependencies and devDependencies and start the server.

```sh
$ cd dillinger
$ npm install -d
$ node app
```

For production environments...

```sh
$ npm install --production
$ npm run predeploy
$ NODE_ENV=production node app
```

### Plugins

Dillinger is currently extended with the following plugins

* Dropbox
* Github
* Google Drive
* OneDrive

Readmes, how to use them in your own application can be found here:

* [plugins/dropbox/README.md] [PlDb]
* [plugins/github/README.md] [PlGh]
* [plugins/googledrive/README.md] [PlGd]
* [plugins/onedrive/README.md] [PlOd]

### Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ node app
```

Second Tab:
```sh
$ gulp watch
```

(optional) Third:
```sh
$ karma start
```
#### Building for source
For production release:
```sh
$ gulp build --prod
```
Generating pre-built zip archives for distribution:
```sh
$ gulp build dist --prod
```
### Docker
Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 80, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd dillinger
npm run-script build-docker
```
This will create the dillinger image and pull in the necessary dependencies. Moreover, this uses a _hack_ to get a more optimized `npm` build by copying the dependencies over and only installing when the `package.json` itself has changed.  Look inside the `package.json` and the `Dockerfile` for more details on how this works.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 80 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart="always" <youruser>/dillinger:latest
```

Run the test application

```sh
cd test
npm install
node index.js
```
```html
http


### Todos

 - Reconnect on socket close
 - Add navigation shortcuts

License
----

MIT


**Have fun!!**
