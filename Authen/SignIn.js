let password;
let userName;
function checkAuthen() {
  password = getElement("#password").value;
  userName = getElement("#userName").value;
  if (userName === "Quyền" && password === "0933882896") {
    Redirect();
  } else {
    alert("Bạn không phải là admin 😳");
  }
}

function Redirect() {
  window.location = "../HL_Administration/views/index.html";
}

// ============ Helpers ==============
function getElement(selector) {
  return document.querySelector(selector);
}
