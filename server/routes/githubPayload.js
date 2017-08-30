var express = require('express');
var router = express.Router();
var url = require('url');
const querystring = require('querystring');
var axios = require('axios');

const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers.common = {
    'User-Agent':'Mesh-Interview',
    //add this to fetch private repo info and increase api access limits
    'Authorization': 'token ' + GITHUB_ACCESS_TOKEN
};

function getCommits(repoArray, cb){
    console.log('get commits');
    var repos = [];
    var promiseArray = repoArray.map(function(repo){
        const commitsPath = '/repos' + url.parse(repo.url).path + '/commits'+ '?' + querystring.stringify({ per_page: '100'});
        const prsPath = '/repos' + url.parse(repo.url).path + '/pulls'+ '?' + querystring.stringify({ per_page: '100'});
        return axios.all([axios.get(commitsPath), axios.get(prsPath)])
            .then(function(results){
                repo.commitCount = results[0].data.length;
                repo.pullRequestCount = results[1].data.length;
                repos.push(repo);
        })});

    axios.all(promiseArray)
        .then(function(results){
            cb(repos);
        });
}

function getPayload(req, res, next) {
    var payload = {};
    //results returned by github api are paginated and the default is 30 per page, we can set it to up to 100 per page
    reposPath = '/user/repos' + '?' + querystring.stringify({per_page: '10'});

    axios.all([axios.get('/user'), axios.get(reposPath)])
        .then(axios.spread(
            function (res1, res2) {
                //user info
                console.log('get user statusCode:', res1.status);
                userInfo = res1.data;
                payload.user = {
                    githubHandle: userInfo.login,
                    githubURL: userInfo.html_url,
                    avatarURL: userInfo.avatar_url,
                    email: userInfo.email,
                    followerCount: userInfo.followers
                };
                //repo infop
                console.log('get repo statusCode:', res2.status);
                const rawRepoArray = res2.data;
                repoArray = rawRepoArray.map(function(repo){return {'name': repo['name'], 'url': repo.html_url}});
                //get commits
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