# Easy and fast WebSockets and [Node.js] MVC framework for single page applications.
Callisto is not one of these framework that gets in your way or tells you how to write your code. Think of it more as a helper than a traditional framework.
The main two goals or Callisto are to be fast and simple. With virtually zero learning curve, it allows you to write application the MVC way, without imposing too many restrictions. It also allows you to:
- Run an https/https web server
- Run a [ws] websocket server on the same port
- Define backend controllers without any configuration 
- Call APIs asynchronously using websockets
- Load HTML and other assets using both http and websockets

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

### Index.js example
```javascript
var callisto = require('callisto');
var users = require('./lib/users.js');
var sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('database.db3');
callisto.server();
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
 
 ### Index.html Example
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
- Wrap the scope with `window.ready` function. The ready function guarantees that the document is ready and that the websocket is connected. 
> Currently, when the client is disconnected the page needs to be refreshed. In the future, this will be handled by the framework.

### API Call
APIs are calls are of course asynchronous, but also use websocjets instead of an XHTTP/AJAX request.
```javascript
window.api(params, callback);
```
```api
params: {
    module: 'module_name', // Module name is the key defined in the addModule function
    method: 'method_name' // Method name is any public method of that module
}
callback: function(err, data)
```
```javascript
window.api({
    module: 'module_name',
    method: 'method_name'
}, function (err, data) {
    //Callback
});
```
### Load HTML
Similar to the window.api, window.html servers HTML (or resource files) over websockets.
```javascript
window.html(path, callback);
```
```api
path: File name relative to the root
callback: function(err, data)
```
```javascript
window.html("html/file.html", function (err, data) {
    //Callback
});
```
> Although slower, you can still use regular http request to serve html 
```javascript
 $.post("/html/file.html", function (data) {
 // Callback
}
```
### Client Controller Example
```javascript
'use strict';
window.ready(function () {

    function getUsers() {
        window.api({
            module: 'users',
            method: 'getUsers'
        }, function (err, data) {
            var i, ul = $('#users-list');
            if (err) {
                console.log(err);
            }
            for (i = 0; i < data.length; i++) {
                ul.append($('<li>' + data[i].name + '</li>'));
            }
        });
    }

    window.html("html/home.html", function (err, data) {
        $('#content').html(data);
    });

    $('#home').click(function (e) {
        window.html("html/home.html", function (err, data) {
            $('#content').html(data);
        });
        e.preventDefault();
    });

    $('#users').click(function (e) {
        window.html("html/users.html", function (err, data) {
            $('#content').html(data);
            getUsers();
        });
        e.preventDefault();
    });

    $('#rabbit').click(function (e) {
        window.html("html/rabbit.html", function (err, data) {
            $('#content').html(data.toString());
        });
        e.preventDefault();
    });
});
```

### Run The Test Application

```sh
cd test
npm i
node index.js
```
And load it in the browser http://localhost:8080

License
----

MIT

**Have fun!**


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [@thomasfuchs]: <http://twitter.com/thomasfuchs>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [keymaster.js]: <https://github.com/madrobby/keymaster>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>
   [ws]: <https://github.com/websockets/ws> 
   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]:  <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
