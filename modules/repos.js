var app = app || {};

(function (module) {
    const repos = {};

    repos.all = [];
    repos.requestRepos = function (callback) {

        $.get('github/users/GavinThomas1192')
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
