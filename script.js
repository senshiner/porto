const scriptURL = "https://script.google.com/macros/s/AKfycbxGn38VLEvRdLMmGpovef3bvTXYhk_vBK-EAyI6r_-rCILfHGrLcnNXz1pAJN0ybCIXCg/exec";
const form = document.forms["kontaksy"];
// custom
const btnSend = document.querySelector(".btn-send");
const btnLoading = document.querySelector(".btn-loading");
const alertKu = document.querySelector(".alert-ku");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // custom button
  btnLoading.classList.toggle("d-none");
  btnSend.classList.toggle("d-none");
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      // button
      btnLoading.classList.toggle("d-none");
      btnSend.classList.toggle("d-none");
      // alert
      alertKu.classList.toggle("d-none");
      // reset form
      form.reset();
      console.log("Success!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});
