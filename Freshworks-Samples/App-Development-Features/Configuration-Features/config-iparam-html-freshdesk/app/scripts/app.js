const JOKE_ENDPOINT = 'https://official-joke-api.appspot.com/random_joke';

function getJoke() {
  client.request.get(JOKE_ENDPOINT).then(
    function (data) {
      let setup = JSON.parse(data.response).setup;
      punchline = JSON.parse(data.response).punchline;
      document.getElementById('setup').innerHTML = `<fw-label value="Question:" color="red"></fw-label> ${setup}`;
    }), function(error) {
      console.log(error )
    }
}

function addListner() {
  document.getElementById('punchline_btn').addEventListener('click', function() {
    document.getElementById('punchline').innerHTML = `<fw-label value="${punchline}" color="green"></fw-label>`
  })
}

document.onreadystatechange = function () {
  if (document.readyState === 'interactive') renderApp();

  function renderApp() {
    var onInit = app.initialized();

    onInit.then(getClient).catch(handleErr);

    function getClient(_client) {
      window.client = _client;
      client.events.on('app.activated', onAppActivate);
    }
  }
};

function onAppActivate() {
  var textElement = document.getElementById('apptext');
  var getContact = client.data.get('contact');
  getContact.then(showContact).catch(handleErr);

  function showContact(payload) {
    textElement.innerHTML = `Ticket created by ${payload.contact.name}`;
  }
  getJoke();
  addListner();
}

function handleErr(err) {
  console.error(`Error occured. Details:`, err);
}
