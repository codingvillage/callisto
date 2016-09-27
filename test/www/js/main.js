'use strict';
$(document).ready(function () {

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

    $.post("/html/home.html", function (data) {
        $('#content').html(data);
    });

    $('#home').click(function (e) {
        $.post("/html/home.html", function (data) {
            $('#content').html(data);
        });
        e.preventDefault();
    });

    $('#users').click(function (e) {
        $.post("/html/users.html", function (data) {
            $('#content').html(data);
            getUsers();
        });
        e.preventDefault();
    });

    $('#rabbit').click(function (e) {
        $.post("/html/rabbit.html", function (data) {
            $('#content').html(data);
        });
        e.preventDefault();
    });
});