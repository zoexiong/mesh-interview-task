'use strict';

//Need to modularize
//Need to call requestRepos
//Need to display info
//Need to test
//OAUTH
var app = app || {};

(function (module) {
    const repos = {};

    repos.all = [];
    repos.requestRepos = function (callback) {

        $.get('github/user/repos')
            .then(
            data => {
                console.log('THIS IS DATA', data);
                repos.all = data, err => console.error(err)
                    .then
                callback();
            }
            )
    };
    repos.with = attr => repos.all.filter(repo => repo[attr]);

    module.repos = repos;
})(app);





