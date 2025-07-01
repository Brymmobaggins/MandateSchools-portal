/** @format */

const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user || !user.role == "admin") {
  window.location.href = "login.html";
}
