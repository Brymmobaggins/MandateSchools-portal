/** @format */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("admission-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent form submission

    const formData = new FormData(form);

    const studentData = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phoneNumber: formData.get("phone-number")
    };

    // get the item from local storage, if it is not available assign an empty array to it
    const application =
      JSON.parse(localStorage.getItem("admissionApplication")) || [];

    // push or add new applicant to the array
    application.push(studentData);

    // save back to local storage
    localStorage.setItem("admissionApplication", JSON.stringify(application));


    // 
    alert("Application Submitted Successfully")

    // reset form
    form.reset();
  });
});
