# Mesh Interview Task

The Mesh interview task is to write a simple HTTP server that is integrated with the GitHub API. It can be written in whatever language you are most comfortable with. You can find all GitHub documentation at the following URL.

https://developer.github.com/

## Installation

* Simply Fork and clone this repository
* Navigate to the folder in your terminal
* $ npm i
* $ npm run start

* Your local server should be up and running simply click the button at http://localhost:3001 and check the developer console.
* This app requires you to have a .env file with your specific Github token



#### Example .env file
* Your .env should look like this
  * GITHUB_TOKEN = 'yourxxxsecretxxxtoken'


#### Future considerations
* On Login Github OAuth would trigger the storing of token information making live app dynamic and prompting removal of .env files.
* I would like to create a front facing site to display the github payload data. 


