/** @format */

const adminUser = {
  username: "admin",
  password: "1234",
  role: "admin",
};

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

  // Handle form submit
  // Handle form submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("user-input").value;
    const password = document.getElementById("user-password").value;

    if (username == adminUser.username && password === adminUser.password) {
      const user = JSON.parse(localStorage.getItem("user")) || [];
      // Move the declaration of dummyUsers here, before it's used
      const dummyUsers = {
        username,
        password,
      };
      dummyUsers.push(user);

      localStorage.setItem(JSON.stringify(user));

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
