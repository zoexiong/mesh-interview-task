var app = app || {};

(function (module) {
    const repos = {};

    repos.all = [];
    repos.requestUser = function (callback) {

        $.get('github/user')
            .then(
            data => {
                payload.user.email = data.email
                payload.user.githubURL = data.html_url
                payload.user.followerCount = data.followers
                payload.user.githubHandle = data.login
                payload.user.avatarURL = data.avatar_url
                console.log('THIS IS USER DATA', data, payload);
                repos.all = data, err => console.error(err)
                    .then()
                callback();
            }
            )
    };
    repos.requestRepos = function (callback) {
        $.get('github/user/repos')
            .then(
            data => {
                payload.user.repositories.name = data.full_name
                payload.user.repositories.url = data.html_url
                // payload.user.repositories.name.commitCount = data.followers
                // payload.user.repositories.name.pullRequestCount = data.login
                console.log('THIS IS REPO DATA', data);
                repos.all = data, err => console.error(err)
                    .then()
                callback();
            }
            )
    };
    repos.with = attr => repos.all.filter(repo => repo[attr]);

    module.repos = repos;
})(app);




// payload.user.repositories.name = data.full_name
// payload.user.repositories.name.url = data.html_url
// payload.user.repositories.name.commitCount = data.followers