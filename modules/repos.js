var app = app || {};

(function (module) {
    const repos = {};

    repos.requestUser = function (callback) {
        $.get('github/user')
            .then(
            data => {
                payload.user.email = data.email
                payload.user.githubURL = data.html_url
                payload.user.followerCount = data.followers
                payload.user.githubHandle = data.login
                payload.user.avatarURL = data.avatar_url
                repos.all = data, err => console.error(err)
                    .then()
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
                    $.ajax({
                        type: "GET",
                        url: '/githubPayload',
                        data: payload,
                        cache: false

                    })
                        .then(
                        payloadData => {
                            return payloadData
                        }

                        )
                }
                )
                .then())
    };



    repos.requestPayload = function (callback) {

        $.get(`/githubPayload`)
            .then(
            response => {
                repos.requestUser();

            }
            )
    };

    module.repos = repos;
})(app);



