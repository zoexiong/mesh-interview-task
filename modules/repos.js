var app = app || {};

(function (module) {
    const repos = {};

    repos.all = [];
    repos.test = 'helloworld'
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
                data.map(ele => {
                    payload.user.repositories.push({
                        name: ele.name,
                        url: ele.html_url,
                        commitCount: ele.commits_url

                    })
                })

                console.log('THIS IS REPO DATA', data);
                console.log('THIS IS MESH PAYLOAD', payload)
                repos.all = data, err => console.error(err)
                    .then()
                callback();
            }
            )
    };

    repos.requestPayload = function (callback) {

        $.get('/githubPayload')
            .then(
            data => {
                console.log('GITHUBPAYLOAD', data)
                // .then()
                callback();
            }
            )
    };
    repos.with = attr => repos.all.filter(repo => repo[attr]);

    module.repos = repos;
})(app);

