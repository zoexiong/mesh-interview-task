
'use-strict';
$(document).ready(function () {

    app.repos.requestRepos(app.repoView.index)
    app.repos.requestUser(app.repoView.index);
});
