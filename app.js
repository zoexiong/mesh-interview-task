
'use-strict';
$(document).ready(function () {

    // app.repos.requestRepos(app.repoView.index)
    app.repos.requestUser(app.repoView.index);
    // app.repos.requestPayload(app.repoView.index);
    $('#get').click(function () {
        app.repos.requestPayload(app.repoView.index)
    })
});

