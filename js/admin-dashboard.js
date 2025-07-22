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
        <span class="s-tag ${getStatusClass(app.status)}">${app.status || "Pending"}</span>
      </td>
      <td>
          <button type="button" class="s-btn s-btn__sm s-btn__muted" onclick="viewDetails(${index})">View</button>
      </td>
    `;
    studentsTableBody.appendChild(tableRow);
  });
  //  window is attached to called inline onclick function to run
  window.viewDetails = function (index) {
    const app = applications[index];
    curentAppIndex = index;

    const studentDetailsContainer = document.getElementById(
      "studentDetailsContainer"
    );

    studentDetailsContainer.innerHTML = `
      <p><strong>Full Name:</strong> ${app.fullName}</p>
      <p><strong>Email:</strong> ${app.email}</p>
      <p><strong>Phone Number:</strong> ${app.phoneNumber}</p>
      <p><strong>Date Of Birth:</strong> ${app.DOB}</p>
      <p><strong>Gender:</strong> ${app.gender}</p>
      <p><strong>Address:</strong> ${app.address}</p>
      <p><strong>Previous School:</strong> ${app.previousSchool}</p>
      <p><strong>Class Applying for:</strong> ${app.classApplyingfor}</p>

      <div class="d-flex mt8 g8">
        <button class="s-btn s-btn__filled s-btn__success" id="approve-btn">Approve</button>
        <button class="s-btn s-btn__outlined s-btn__danger" id="reject-btn">Reject</button>
      </div>
                    
    `;

    document.getElementById("view-modal").classList.remove("d-none");

    document.getElementById("approve-btn").onclick = () =>
      updateApplicationStatus(index, "Approved");

    document.getElementById("reject-btn").onclick = () =>
      updateApplicationStatus(index, "Rejected");
  };

  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("view-modal").classList.add("d-none");
  });
});

function updateApplicationStatus(index, status) {
  const applications =
    JSON.parse(localStorage.getItem("admissionApplication")) || [];
  applications[index].status = status;
  localStorage.setItem("admissionApplication", JSON.stringify(applications));
  document.getElementById("view-modal").classList.add("d-none");
  window.location.reload();
}

// this fuction will update the status of the applicant on the DOM
function getStatusClass(status) {
  if (status == "Approved") return "s-tag__success";
  if (status == "Rejected") return "s-tag__danger";
  return "s-tag__info";
}
