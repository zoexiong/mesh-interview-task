var express = require('express');
var router = express.Router();
var url = require('url');
const querystring = require('querystring');
var axios = require('axios');

const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers.common = {
    'User-Agent':'Mesh-Interview',
    'Authorization': 'token ' + GITHUB_ACCESS_TOKEN
};

function getPayload(req, res, next) {
    var payload = {};
    reposPath = '/user/repos' + '?' + querystring.stringify({per_page: '10'});

    axios.all([axios.get('/user'), axios.get(reposPath)])
        .then(
            axios.spread(
                function (res1, res2) {
                    //res1
                    console.log('get user statusCode:', res1.status);
                    userInfo = res1.data;
                    payload.user = {
                        githubHandle: userInfo.login,
                        githubURL: userInfo.html_url,
                        avatarURL: userInfo.avatar_url,
                        email: userInfo.email,
                        followerCount: userInfo.followers
                    };
                    //res2
                    console.log('get repo statusCode:', res2.status);
                    const rawRepoArray = res2.data;
                    repoArray = rawRepoArray.map(function(repo){return {'name': repo['name'], 'url': repo.html_url}});

                    getCommits(repoArray, function(payloadRepos){
                        payload.repositories = payloadRepos;
                        res.json(payload)
                    });
                }))
        .catch(function (error) {
            console.log(error);
        });
}

/* GET users listing. */
router.get('/', getPayload);

module.exports = router;