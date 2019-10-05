/**
 * This script file acts for modal.html
 *
 * This demonstrates, Using instance API to retrieve the data received from
 * the parent location.
 */

$(document).ready(function () {
    app.initialized().then(function (_client) {
        var client = _client;
        client.instance.context().then(function (context) {
            console.log("Modal instance API context", context);
            /* Output: Modal instance API context
            * { instanceId: "4",   location: "modal", parentId: "1",
            * modalData: {name: "James", email: "James@freshdesk.com"}
            * }"
            * */

            $('#name').val(context.data.name);
            $('#email').val(context.data.email);
        });
    });
});
