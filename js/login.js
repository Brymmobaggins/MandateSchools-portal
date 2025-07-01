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
      user.push(newUser);
      localStorage.setItem("loggedInUser", JSON.stringify(adminUser));

      window.location.href = "admin-dashboard.html";
    } else {

 
      alert("invalid Credentials");
    }

   

    // if (role === "admin") {
    //   window.location.href = "admin-dashboard.html";
    // } else {
    //   window.location.href = "student-dashboard.html";
    // }
  });
});
