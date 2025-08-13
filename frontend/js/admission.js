/** @format */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("admission-form");

  const fullNameInput = document.querySelector('input[name="fullName"]');
  const emailInput = document.querySelector('input[name="email"]');
  const phoneInput = document.querySelector('input[name="phone"]');
  const addressInput = document.querySelector('input[name="address"]');
  const previousSchooInput = document.querySelector(
    'input[name="prev-school"]'
  );

  const classSelected = document.querySelector('select[name="class"]');
  const dobInput = document.querySelector('input[name="dob"]');

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent form submission
    //  check for full name
    const isFullNameValid = validationField(
      fullNameInput,
      "Full Name is required",
      (value) => value !== ""
    );
    // check for email
    const isEmailValid = validationField(
      emailInput,
      "Enter Valid Email",
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    );
    //  check for phone number
    const isPhoneValid = validationField(
      phoneInput,
      "Phone number must be 11 digit",
      (value) => /^\d{11}$/.test(value)
    );

    // check for DOB
    const isDOBValid = validationField(
      dobInput,
      "Enter a valid date of Birth",
      (value) => {
        if (!value) return false;
        const selected = new Date(value);
        const today = new Date();
        return selected < today;
      }
    );
    //  check for Gender
    const selectedGender = document.querySelector(
      'input[name="gender"]:checked'
    );
    // Assuming genderRadios should be defined elsewhere,
    // add a check to ensure it's not undefined and has elements.
    // For example, if genderRadios is populated by document.querySelectorAll('input[name="gender"]'):
    const genderRadios = document.querySelectorAll('input[name="gender"]'); // Make sure genderRadios is defined and populated

    let genderContainer;
    let genderError;

    if (genderRadios && genderRadios.length > 0) {
      genderContainer = genderRadios[0].closest(".gender-group");
      if (genderContainer)
        genderError = genderContainer.querySelector(".error-message");
    }

    if (!genderError) {
      genderError = document.createElement("p");
      genderError.className = "fc-red-500 mt4 fs-caption error-message";
      if (genderContainer) {
        genderContainer.appendChild(genderError);
      }
    }

    let isGenderValid;
    if (selectedGender !== null) {
      isGenderValid = true;
    } else {
      isGenderValid = false;
    }
    genderError.textContent = isGenderValid ? "" : "Please select a gender.";

    // check for address
    const isAddressValid = validationField(
      addressInput,
      "Enter your address",
      (value) => value !== ""
    );

    // logic check for previous school field
    const isPreviousSchoolValid = validationField(
      previousSchooInput,
      "Enter your previous School",
      (value) => value !== ""
    );
    // logic for class applying for
    const isClassSelected = validationField(
      classSelected,
      "Select a class to apply for",
      (value) => value !== ""
    );
    // logic for confirm info
    const confirmCheckbox = document.querySelector(
      'input[name="confirm-info"]'
    );
    const confirmGroup = confirmCheckbox.closest(".confirm-group");
    let confirmError = confirmGroup.querySelector(".error-message");

    const isConfirmChecked = confirmCheckbox.checked;
    // if user checked add"d-none" class, so the error would show
    confirmError.classList.toggle("d-none", isConfirmChecked);
    confirmError.textContent = isConfirmChecked
      ? ""
      : "Check the box if your information is accurate";

    if (
      !isFullNameValid ||
      !isEmailValid ||
      !isPhoneValid ||
      !isAddressValid ||
      !isDOBValid ||
      !isGenderValid ||
      !isPreviousSchoolValid ||
      !isClassSelected ||
      !isConfirmChecked
    ) {
      return false;
    } else {
      const formData = new FormData(form);
      const studentData = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        phoneNumber: formData.get("phone-number"),
        DOB: formData.get("dob"),
        gender: formData.get("gender"),
        previousSchool: formData.get("prev-school"),
        address: formData.get("address"),
        classApplyingfor: formData.get("class"),
      };

      // get the item from local storage, if it is not available assign an empty array to it
      const application =
        JSON.parse(localStorage.getItem("admissionApplication")) || [];
      application.push(studentData);

      // save back to local storage
      localStorage.setItem("admissionApplication", JSON.stringify(application));

      document.querySelector("section").classList.add("d-none");

      document.querySelector("#spinner-wrapper").classList.remove("d-none");

      //  the success message would delay for five seconds before display
      setTimeout(() => {
        window.location.href = "admission-success.html";
      }, 5000);

      // reset form
      form.reset();
    }
  });
});

function validationField(inputElement, errorMessage, validator) {
  // Check if inputElement is null or not a valid DOM element
  if (!inputElement || !(inputElement instanceof Element)) {
    return; // Exit the function early if inputElement is invalid
  }
  let errorElement = inputElement.nextElementSibling;

  // if the next sibbling is not <p> element
  if (!errorElement || !errorElement.contains("error-message")) {
    errorElement = document.createElement("p");
    errorElement.className = "fs-caption error-message fc-red-500";
    inputElement.parentNode.insertBefore(
      errorElement,
      inputElement.nextSibling
    );
  }
  const value = inputElement.value.trim();
  const isValid = validator(value);

  if (!isValid) {
    errorElement.textContent = errorMessage;
    return false;
  } else {
    errorElement.textContent = "";
    return true;
  }
}

setTimeout(() => {}, 300);
