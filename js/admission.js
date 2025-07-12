/** @format */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("admission-form");
  const fullNameInput = document.querySelector('input[name="fullName"]');

  const fullNameError = document.createElement("div");
  fullNameError.className = "fs-caption fc-red-500 mt4";
  fullNameInput.parentNode.insertBefore(
    fullNameError,
    fullNameInput.nextElementSibling
  );

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent form submission

    let isValid = true;

    if (fullNameInput.value.trim() == "") {
      fullNameError.textContent = "full name is required";
      isValid = false;
    } else {
      fullNameError.textContent = "";

      const formData = new FormData(form);
      const studentData = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        phoneNumber: formData.get("phone-number"),
      };

      // get the item from local storage, if it is not available assign an empty array to it
      const application =
        JSON.parse(localStorage.getItem("admissionApplication")) || [];

      // push or add new applicant to the array
      application.push(studentData);

      // save back to local storage
      localStorage.setItem("admissionApplication", JSON.stringify(application));

      // redirect to success page after form submission
      window.location.href = "admission-success.html";

      // reset form
      form.reset();
    }
  });
});
