'use strict';
module.exports = (function () {

    function USER_MODEL() {

        var users = ['user1', 'user2', 'user3'];
        this.getAllUsers = function (callback) {
            if (typeof callback === 'function') {
                callback(null, users);
            }
        };
    }

    return new USER_MODEL();
}());

