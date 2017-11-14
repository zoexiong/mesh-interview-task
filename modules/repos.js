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
            .then(
            $.get('github/user/repos')
                .then(
                resultData => {
                    resultData.map(ele => {
                        payload.user.repositories.push({
                            name: ele.name,
                            url: ele.html_url,
                            commitCount: ele.commits_url
                        })
                    })
                        .then()
                    callback()
                }

                ))
            .then(
            $.get('/githubPayload')
                .then(
                payloadData => {
                    console.log(payloadData)
                        .then()
                    callback()
                }

                )
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

