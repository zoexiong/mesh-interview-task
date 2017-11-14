
'use-strict';
$(document).ready(function () {

    // app.repos.requestRepos(app.repoView.index)
    app.repos.requestUser();
    // app.repos.requestPayload();
    $('#get').click(function () {
        app.repos.requestPayload(app.repoView.index)
    })
});

