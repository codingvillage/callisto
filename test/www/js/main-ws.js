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