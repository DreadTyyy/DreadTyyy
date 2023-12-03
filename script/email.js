document
  .getElementById("mail-contact")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let status;

    var formData = new FormData(this);
    formData.append("service_id", "service_8z8fv3m");
    formData.append("template_id", "template_xfcru8f");
    formData.append("user_id", "oAswsdcPi-LerWfyn");

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.emailjs.com/api/v1.0/email/send-form");

    xhr.onload = function () {
      if (xhr.status === 200) {
        status = "success";
        document.getElementById("mail-contact").reset();
      } else {
        alert("Oops... " + xhr.statusText);
      }
      renderAlert(status);
    };

    xhr.onerror = function () {
      status = "error";
      renderAlert(status);
    };
    xhr.send(formData);
  });

function renderAlert(status) {
  const contactSection = document.getElementById("contact");
  const alertHERE = document.querySelector(".ALERT__HERE");
  const alert = {
    success: {
      title: "Success",
      message:
        "Your message has been successfully sent. wait for a reply from me.",
      text: "Thank You",
      style_color: "rgb(20, 187, 216)",
      style_color_p: "#191426",
      style_color_btn: "#191426",
      button: "CONTINUE",
    },
    error: {
      title: "Opsss...",
      message: "Something went wrong and the operation can't be finished",
      text: "Please Try Again",
      style_color: "rgb(255, 60, 60)",
      style_color_p: "#fff",
      style_color_btn: "rgb(255, 60, 60)",
      button: "TRY AGAIN",
    },
  };
  const alertSubmit = document.createElement("div");
  alertSubmit.classList.add("alert-submit");
  alertSubmit.style.background = `${alert[status].style_color}`;

  const headingAlert = document.createElement("h2");
  headingAlert.innerText = alert[status].title;

  const div = document.createElement("div");
  const message1 = document.createElement("p");
  const message2 = document.createElement("p");
  message1.innerText = alert[status].message + ".";
  message2.innerText = alert[status].text + ".";
  message1.style.color = `${alert[status].style_color_p}`;
  message2.style.color = `${alert[status].style_color_p}`;
  div.appendChild(message1);
  div.appendChild(message2);

  const buttonAlert = document.createElement("button");
  buttonAlert.innerText = alert[status].button;
  buttonAlert.style.color = `${alert[status].style_color_btn}`;
  buttonAlert.classList.add("button-alert");
  alertSubmit.appendChild(headingAlert);
  alertSubmit.appendChild(div);
  alertSubmit.appendChild(buttonAlert);

  location.assign("/#contact");
  document.body.style.overflow = "hidden";
  alertHERE.appendChild(alertSubmit);

  buttonAlert?.addEventListener("click", closeAlert);

  // membuat overlay
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  contactSection.appendChild(overlay);
}
function closeAlert() {
  const alertSubmit = document.querySelector(".alert-submit");
  const overlay = document.querySelector(".overlay");
  alertSubmit.remove();
  overlay.remove();
  document.body.style = "";
}
