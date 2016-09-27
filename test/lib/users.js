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

