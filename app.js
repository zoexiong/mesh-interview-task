'use-strict';
$(document).ready(function () {
    $('#get').click(function () {
        app.repos.requestPayload()
        console.log('AFTER BUTTON CLICK PAYLOAD', payload)

    })
});

