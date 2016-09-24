'use strict';

function walk(element) {
    element.find('[data-href]').each(function () {
        var el = $(this);
        if (el.data('target')) {
            el.on('click', function (e) {
                window.api({
                    module: 'web',
                    method: 'html',
                    params: {
                        page: el.data('href'),
                        target: el.data('target')
                    }
                });
                e.preventDefault();
            });
        }
    });

    element.find('[data-content]').each(function () {
        var el = $(this), id = el.attr('id');
        if (!id) {
            id = window.guid();
            el.attr('id', id);
        }
        window.api({
            module: 'web',
            method: 'html',
            params: {
                page: el.data('content'),
                target: id
            }
        });
    });
}
window.ready(function () {
    walk($(document));
});

window.observe('page', function (data) {
    var target = $('#' + data.target);
    target.html(data.html);
    walk(target);
});