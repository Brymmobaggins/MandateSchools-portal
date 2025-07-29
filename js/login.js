/**
 * Handles the login page logic for both Admin and Student roles.
 * - Dynamically updates the page title and login type text based on the "role" query parameter.
 * - Handles form submission for login, validating credentials for admin users.
 * - Stores the logged-in admin user in localStorage and redirects to the admin dashboard on success.
 * - Displays error messages for invalid credentials.
 * - Hides error messages when the user modifies input fields.
 *
 * Dependencies:
 * - Expects DOM elements with IDs: "pageTitle", "loginForm", "loginType", "user-input", "user-password".
 * - Uses localStorage to persist the logged-in user.
 *
 * @event DOMContentLoaded
 * @listens form#loginForm:submit
 * @listens input#user-input:input
 * @listens input#user-password:input
 */
/** @format */

document.addEventListener("DOMContentLoaded", function () {
  const title = document.getElementById("pageTitle");
  const form = document.getElementById("loginForm");
  const typeText = document.getElementById("loginType");
  const role = new URLSearchParams(window.location.search).get("role");

  if (!title || !typeText) {
    console.error("Error: Required DOM elements not found.");
    return;
  }

  const isAdmin = role === "admin";
  title.textContent = isAdmin ? "Admin Login" : "Student Login";
  typeText.textContent = isAdmin
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
