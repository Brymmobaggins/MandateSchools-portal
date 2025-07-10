@@ -0,0 +1,24 @@
/** @format */

// /** @format */

const user = JSON.parse(localStorage.getItem("loggedInUser"));

// if (!user || !user.role == "student") {
//   window.location.href = "login.html";
// }

const logoutModal = document.getElementById("logout-modal");

document.getElementById("cancel-logout").addEventListener("click", () => {
  logoutModal.classList.add("d-none");
});

document.getElementById("confirm-logout").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});

document.getElementById("logout-btn").addEventListener("click", () => {
  logoutModal.classList.remove("d-none");
});