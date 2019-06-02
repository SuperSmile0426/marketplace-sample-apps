/**
 * @desc - Sample App shows fectching Contact from Data API and shows on Ticket
 * sidebar
 */

// $(document).ready(() => {
//   app.initialized().then((_client) => { // Client Object is obtained
//     const client = _client;
//     /**
//      * app.activated() is bought into scope, and timing differs
//      * based on the location of the app in the FreshProduct.
//      */
//     client.events.on('app.activated', () => {
//       /**
//        * Making an Asyc call to Data API and feching the details from
//        * the current ticket Payload.
//        * @info - https://developers.freshdesk.com/v2/docs/data-api/#contactAPI
//        */
//       client.data.get('contact').then(function(data) {
//         $('#apptext').text("Ticket created by "+ data.contact.name);
//       }).catch((e) => { 
//         console.log('Exception -',e);
//       }); 
//    });
//   });
// });

$(document).ready(function(){   
  
  app.initialized().then((_client)=>{
    window.client = _client;
    client.events.on('app.activated',()=>{
    console.log(`App activated`);
    getcontactdata();
    });
  });

  function getcontactdata(){
    console.log(`getting app data`);
    client.data.get('contact').then((data)=>{
    $('#apptext').text(`Ticket created by ${data.contact.name}`);  
    },(e)=>{
      console.log('Exeception -',e);
    });
  }

});