// /**
//  * @description - This app makes REST API calls to httpbin.org.
//  * 
//  * 1. Request API - GET, POST, PUT & DELETE
//  */

// const BASE_URL = "https://httpbin.org/";

// function displayStatus(type, message) {
//   client.interface.trigger('showNotify', {
//      type: type,
//      message: message
//     });
// }

// $(document).ready( function() {
//   app.initialized().then((_client) => {
//     window.client = _client;
//     client.events.on('app.activated', initButton);
    
//     function initButton() {
//       jQuery(".request-btn").click((e)=>{
//       var method = e.target.getAttribute('method');
//       var url = BASE_URL + method;
//       var options = {
//         "headers" : {
//           "Content-Type": "application/json"
//         }
//       };
//       client.request[method](url, options)
//       .then(() => {
//         displayStatus('success', method.toUpperCase() + ' request successful.');
//       }, () => {
//         displayStatus('danger', method.toUpperCase() + ' request failed.');
//       });
//       });
//     }

//   });
// });

/**
 * @description - This app makes REST API calls to httpbin.org.
 * 
 * 1. Request API - GET, POST, PUT & DELETE
 */

const BASE_URL = "https://httpbin.org/"


 $(document).ready(function(){
  (function(){
    app.initialized().then((_client)=>{
      window.client = _client;
      client.events.on('app.activated', init);
    });
    
    function init(){
      $(".request-btn").click((e)=>{
        let method = e.target.getAttribute('method');
        const url = BASE_URL + method;
        const options = {
        "headers" : {
          "Content-Type": "application/json"
        }
        };
        console.log(`${e}`);
        req(method,url,options);
      });
    }

    function req(method,url,options){
      client.request[method](url, options)
      .then(() => {
        displayStatus('success',`${method.toUpperCase()} request successful`);
      }, () => {
        displayStatus('danger', `${method.toUpperCase()} request failed`);
      });
    }

    function displayStatus(type, message){
      client.interface.trigger('showNotify',{
        type: type,
        message: message
      });
    }
  
  })();
 });
