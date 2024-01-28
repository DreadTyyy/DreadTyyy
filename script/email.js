function sendEmail(data, renderAlert) {
  let status;

  var formData = new FormData(data);
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
}

export default sendEmail;
