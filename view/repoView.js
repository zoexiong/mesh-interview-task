'use strict';
var app = app || {};

(function (module) {
    const repoView = {};


    // const ui = function () {
    //     let $about = $('#githubInfo');

    //     $about.find('ul').empty();
    // };

    let source = $('#repo-template').html();
    let render = Handlebars.compile(source);

    repoView.index = function () {
        // ui();

        $('#githubInfo ul').append(
            app.repos.map(render)

        );
    };

    module.repoView = repoView;
})(app);
