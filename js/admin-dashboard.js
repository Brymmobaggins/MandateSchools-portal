/** @format */

const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user || !user.role == "admin") {
  window.location.href = "login.html";
}

const logoutBtn = document.getElementById("log-out");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
});
