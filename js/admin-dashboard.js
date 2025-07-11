/** @format */
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("application-container");

  const applications =
    JSON.parse(localStorage.getItem("admissionApplication")) || [];

  if (applications.length == 0) {
    container.innerHTML = `<p class="fsbody2 p8">No Application Submitted yet</p>`;
  }

  applications.forEach((app, index) => {
    const card = document.createElement("div");
    card.className = "ba bc-100-300 p16 bar-md";

    card.innerHTML = `
     <h3 class="mb4">${app.fullName}</h3>
     <p><strong>Email:</strong>${app.email}</p>
     <p><strong>Phone Number:</strong>${app.phoneNumber}</p>
    
    
    `;
    container.appendChild(card);
  });
});

const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user || !user.role == "admin") {
  window.location.href = "login.html";
}
const logoutBtn = document.getElementById("log-out");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
});
