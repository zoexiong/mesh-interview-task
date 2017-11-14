var app = app || {};

(function (module) {
    const serverPayload = {};


    serverPayload.requestPayload = function (callback) {

        $.get('githubPayload')
            .then(
            data => {
                console.log('GITHUBPAYLOAD', data)
                    .then()
                callback();
            }
            )
    };


    module.serverPayload = serverPayload;
})(app);

