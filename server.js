'use-strict';
require('dotenv').config()

let express = require('express');
let app = express();
const requestProxy = require('express-request-proxy');
const bodyParser = require('body-parser').urlencoded({ extended: true });
const PORT = process.env.PORT || 3001

app.use(express.static('.'))

function proxyGithub(request, response) {
    console.log('Routing Github request for', request.params[0]);
    console.log(`${process.env.GITHUB_TOKEN}`);
    (requestProxy({
        url: `https://api.github.com/${request.params[0]}`,
        headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
    }))(request, response);

}

app.get('/github/*', proxyGithub);

app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: './' })
})

app.listen(PORT, function () {
    console.log(`Listening on port: "${PORT}"`)
})