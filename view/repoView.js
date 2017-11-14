'use strict';
var app = app || {};

(function (module) {
    const repoView = {};



    let source = $('#repo-template').html();
    let render = Handlebars.compile(source);

    repoView.index = function () {

        $('#githubInfo ul').append(
            app.repos.map(render)

        );
    };

    module.repoView = repoView;
})(app);
