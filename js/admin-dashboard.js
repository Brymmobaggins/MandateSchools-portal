/** @format */
document.addEventListener("DOMContentLoaded", () => {
  const studentsTableBody = document.getElementById("studentsTableBody");

  const applications =
    JSON.parse(localStorage.getItem("admissionApplication")) || [];

  if (applications.length == 0) {
    studentsTableBody.innerHTML = `<p class="fsbody2 p8">No Application Submitted yet</p>`;
  }

  applications.forEach((app, index) => {
    const tableRow = document.createElement("tr");
    tableRow.className = "ba bc-100-300 p16 bar-md";

    tableRow.innerHTML = `
     <td>${app.fullName}</td>
     <td>${app.email}</td>
     <td>${app.phoneNumber}</td>
     <td>${app.DOB}</td>
     <td>${app.gender}</td>
     <td>${app.address}</td>
     <td>${app.previousSchool}</td>
     <td>${app.classApplyingfor}</td>
     <td>
     <span class="s-tag s-tag__info">
       Pending
     </span>
     </td>
     <td>
      <button type="button" class="s-btn s-btn_sm s-btn__muted" onclick="viewDetails(${index})">View</button>
     </td>
    
    
    `;
    studentsTableBody.appendChild(tableRow);
  });
  //  window is attached to called inline onclick function to run
  window.viewDetails = function (index) {
    const app = applications[index];
    const modal = document.getElementById("view-modal");
    const details = document.getElementById("studentDetailsContainer");

    details.innerHTML = 
    `
      <p><strong>Full Name:</strong> ${app.fullName}</p>
      <p><strong>Email Name:</strong> ${app.email}</p>
      <p><strong>Email Name:</strong> ${app.phoneNumber}</p>
    
    `;
    
    modal.classList.remove("d-none");
  };

  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("view-modal").classList.add("d-none");
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
