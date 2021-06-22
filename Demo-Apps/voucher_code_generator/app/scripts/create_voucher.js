const DANGER_NOTIFICATION = "danger";
const SUCCESS_NOTIFICATION = "success";
const FIELDS_TO_VALIDATE = ["subject", "description", "discount", "validity"];

/* Fetch data from the form fields */
function getFieldValues() {
  return {
    subject: document.getElementById("voucher-subject").value,
    description: document.getElementById("voucher-description").value,
    discount: parseInt(document.getElementById("voucher-discount").value),
    validity: document.getElementById("voucher-validity").value,
  };
}

/* Reset form fields */
function clearFields() {
  document.getElementById("voucher-subject").value = "";
  document.getElementById("voucher-description").value = "";
  document.getElementById("voucher-discount").value = "";
  document.getElementById("voucher-validity").value = "";
  document.getElementById("custom-voucher").value = "";

  var errorPrompts = document.getElementsByClassName("validation-message");
  for (var i = 0; i < errorPrompts.length; i++) {
    errorPrompts[i].innerText = "";
  }
}

/**
 * Save generated voucher code in Database
 * @param {string} subject - Voucher code subject
 * @param {string} description - Voucher code description
 * @param {integer} discount - Discount value in percentage
 * @param {string} validity - Voucher code time period in data scale
 * @param {string} voucher - generated voucher code
 */
function saveVoucherToDb(subject, description, discount, validity, voucher) {
  let createObject = {};
  let id = generateId();
  createObject[`voucher_${id}`] = {
    subject,
    description,
    discount,
    validity,
    voucher,
  };
  client.db.update("vouchers", "set", createObject),
    function (error) {
      console.error("Error updating database with voucher data", error);
    };
}

/* Element event listeners */
function addListeners() {
  var voucherCode = [];
  // Check custom voucher input field toggle status
  toggleSwitchStatus();

  document
    .getElementById("create-voucher")
    .addEventListener("click", function () {
      if (validateFields()) {
        let vSubject = document.getElementById("voucher-subject").value;
        let vDescription = document.getElementById("voucher-description").value;
        let vDiscount = parseInt(
          document.getElementById("voucher-discount").value
        );
        let vValidity = document.getElementById("voucher-validity").value;
        let vCustomVoucher = document.getElementById("custom-voucher").value;
        if (vCustomVoucher != "") {
          voucherCode.push(vCustomVoucher);
          document.getElementById("voucher-label").innerText = voucherCode[0];
          saveVoucherToDb(
            vSubject,
            vDescription,
            vDiscount,
            vValidity,
            voucherCode[0]
          );
          voucherCode.splice(0, voucherCode.length);
        } else {
          client.request.invoke("generateVoucher", {}).then(
            function (data) {
              voucherCode.push(data.response);
              document.getElementById("voucher-label").innerText =
                voucherCode[0];
              saveVoucherToDb(
                vSubject,
                vDescription,
                vDiscount,
                vValidity,
                voucherCode[0]
              );
              voucherCode.splice(0, voucherCode.length);
            },
            function (err) {
              console.error("Request ID: " + err.requestID);
              console.error("error status: " + err.status);
              console.error("error message: " + err.message);
            }
          );
        }

        document.getElementById("voucher-component").classList.remove("hidden");
        clearFields();
      }
    });

  document.getElementById("copy-button").addEventListener("click", function () {
    copyToClipboard(voucherCode[0]);
    sendNotification(SUCCESS_NOTIFICATION, "Copied to Clipboard");
    client.instance.close();
  });

  document
    .getElementById("paste-editor")
    .addEventListener("click", function () {
      pasteInEditor(voucherCode[0]);

      window.frsh_init().then(function (client) {
        let result = {
          code: voucherCode[0],
        };
        client.instance.send({ message: result });
        client.instance.close();
      }),
        function (error) {
          console.error(error);
        };
      event.preventDefault();
    });
}

document.addEventListener("DOMContentLoaded", function () {
  addListeners();

  app.initialized().then(function (_client) {
    window.client = _client;
  }),
    function (error) {
      console.error(error);
    };
});
