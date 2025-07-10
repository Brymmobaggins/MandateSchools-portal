/** @format */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("admission-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent form submission

    const formData = new FormData(form)

    const studentData = {
        fullname : formData.get("fullName")
    }



  });
});
