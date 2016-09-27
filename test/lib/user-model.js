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

