/** @format */

document.addEventListener("DOMContentLoaded", function () {
  const title = document.getElementById("pageTitle");
  const form = document.getElementById("loginForm");
  const typeText = document.getElementById("loginType");
  const role = new URLSearchParams(window.location.search).get("role");
  const spinner = document.getElementById("spinner");
  const formParent = document.getElementById("form-parent");
  const errorBox = document.getElementById("error-div");

  if (!title || !typeText) {
    console.error("Error: Required DOM elements not found.");
    return;
  }

  if (role) {
    // get the first letter, convert it UpperCase, concatenate the rest to Lower case
    let displayRole = role[0].toUpperCase() + role.slice(1).toLowerCase();
    title.textContent = displayRole + " login";
    // typeText.textContent =  displayRole;
    // if role is admin use "an" for grammatical error
    // if (role === "admin") {
    //   typeText.textContent = "Login as an " + displayRole;
    // }
  }

  // Listen for form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get entered username and password
    const username = document.getElementById("user-input").value;
    const password = document.getElementById("user-password").value;

    // Define valid users and their credentials
    const usersArray = [
      { username: "admin", password: "1234", role: "admin" },
      { username: "student", password: "xyz", role: "student" },
      { username: "teacher", password: "teacher123", role: "teacher" },
      { username: "parent", password: "parent123", role: "parent" },
    ];

    // Store users in localStorage for later retrieval
    localStorage.setItem("users", JSON.stringify(usersArray));

    // Show spinner and hide form while verifying credentials
    if (spinner && formParent) {
      formParent.classList.add("d-none");
      spinner.classList.remove("d-none");
      spinner.textContent = "Verifying credentials...";
    }

    // Simulate server-side verification with a delay
    setTimeout(() => {
      // Retrieve users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if entered credentials match any user
      const foundUser = users.find(
        (user) => user.username === username && user.password === password
      );

      if (foundUser) {
        // Save logged in user info
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

        // Redirect to the appropriate dashboard based on user role
        switch (foundUser.role) {
          case "admin":
            window.location.href = "admin-dashboard.html";
            break;
          case "student":
            window.location.href = "student-dashboard.html";
            break;
          case "teacher":
            window.location.href = "teacher-dashbord.html";
            break;
          case "parent":
            window.location.href = "parent-dashboard.html";
            break;
        }
      } else {
        // Show error message and reset UI if credentials are invalid
        if (errorBox) {
          errorBox.textContent = "Invalid Credentials";
          errorBox.classList.remove("d-none");
        }
        if (spinner && formParent) {
          spinner.classList.add("d-none");
          formParent.classList.remove("d-none");
        }
        // reset on failed error
        form.reset();
      }
    }, 5000);

   
  });
});
