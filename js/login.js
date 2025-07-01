/** @format */

document.addEventListener("DOMContentLoaded", function () {
  const title = document.getElementById("loginTitle");
  const form = document.getElementById("loginForm");
  const typeText = document.getElementById("loginType");
  const role = new URLSearchParams(window.location.search).get("role");

  // Adjust title
  title.textContent = role === "admin" ? "Admin Login" : "Student Login";
  typeText.textContent =
    role === "admin"
      ? "You're logging in as an Admin"
      : "You're logging in as a Student";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("user-input").value;
    const password = document.getElementById("user-password").value;

    const adminUser = {
      username: "admin",
      password: "1234",
      role: "admin",
    };
    // Retrieve existing users from local storage, or initialize an empty array if none exist
    const user = JSON.parse(localStorage.getItem("loggedInUser")) || [];

    if (username == adminUser.username && password === adminUser.password) {
      const newUser = {
        username,
        password,
      };
      localStorage.setItem("loggedInUser", JSON.stringify(adminUser));
      user.push(newUser);
      errorBox.classList.add("d-none");
      window.location.href = "admin-dashboard.html";
    } else {
      errorBox.textContent = "Invalid Credentials, Please try again!";
      errorBox.classList.remove("d-none");
    }
  });

  document.getElementById("user-input").addEventListener("input", () => {
    errorBox.classList.add("d-none");
  });

  document.getElementById("user-password").addEventListener("input", () => {
    errorBox.classList.add("d-none");
  });
});
