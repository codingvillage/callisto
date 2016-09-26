'use strict';
var userModel = require('user-model.js');
module.exports = (function () {

    function USER() {

        this.getUsers = function (params, callback) {
            userModel.getAllUsers(callback);
        };
    }

    return new USER();
}());

