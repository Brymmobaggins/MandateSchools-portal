/** @format */

document.addEventListener("DOMContentLoaded", function () {
  const title = document.getElementById("loginTitle");
  const form = document.getElementById("loginForm");
  const role = new URLSearchParams(window.location.search).get("role");

  // Adjust title
  title.textContent = role === "admin" ? "Admin Login" : "Student Login";

  // Handle form submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (role === "admin") {
      window.location.href = "admin-dashboard.html";
    } else {
      window.location.href = "student-dashboard.html";
    }
  });
});
