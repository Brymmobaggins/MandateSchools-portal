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
  const studentDetailsContainer = document.getElementById(
    "studentDetailsContainer"
  );
  const viewModal = document.getElementById("view-modal");
  const closeModalBtn = document.getElementById("closeModal");
  const searchInput = document.getElementById("search-input");
  const statusFilter = document.getElementById("status-filter");

  const applications =
    JSON.parse(localStorage.getItem("admissionApplication")) || [];
  let currentAppIndex = null;

  function renderApplications(applicationList) {
    studentsTableBody.innerHTML = "";

    if (applicationList.length === 0) {
      studentsTableBody.innerHTML = `
        <tr><td colspan="10" class="fsbody2 p8 ta-center">No Applications Found</td></tr>
      `;
      return;
    }

    applicationList.forEach((app, index) => {
      const tableRow = document.createElement("tr");
      tableRow.className = "ba bc-100-300 p16 bar-md";
      tableRow.setAttribute("data-app-id", index);

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
          <span class="s-tag ${getStatusClass(app.status)}">
            ${app.status || "Pending"}
          </span>
        </td>
        <td>
          <button type="button" class="s-btn s-btn__sm s-btn__muted view-btn">View</button>
        </td>
      `;
      studentsTableBody.appendChild(tableRow);
    });

    attachViewHandlers(applicationList);
  }

  function attachViewHandlers(applicationList) {
    const viewButtons = studentsTableBody.querySelectorAll(".view-btn");
    viewButtons.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        currentAppIndex = i;
        const app = applicationList[i];
        showStudentDetails(app, i);
      });
    });
  }
  //  function to show applicants details
  window.showStudentDetails = function (app, index) {
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

    viewModal.classList.remove("d-none");

    document.getElementById("approve-btn").onclick = () =>
      updateApplicationStatus(index, "Approved");

    document.getElementById("reject-btn").onclick = () =>
      updateApplicationStatus(index, "Rejected");
  };
  // function to udpate applicant status
  function updateApplicationStatus(index, status) {
    applications[index].status = status;
    localStorage.setItem("admissionApplication", JSON.stringify(applications));
    renderApplications(applications);
    viewModal.classList.add("d-none");
  }

  closeModalBtn.addEventListener("click", () => {
    viewModal.classList.add("d-none");
  });
  //  function for filter of applicant and return the selected from the dropdow
  function filterApplication() {
    const searchValue = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;

    const filteredApps = applications.filter((app) => {
      const matchesSearch =
        app.fullName.toLowerCase().includes(searchValue) ||
        app.email.toLowerCase().includes(searchValue) ||
        app.classApplyingfor.toLowerCase();

      const appStatus = app.status || "Pending";
      const matchesStatus =
        selectedStatus === "All" || appStatus === selectedStatus;
      return matchesSearch && matchesStatus;
    });

    if (filteredApps.length == 0) {
      studentsTableBody.innerHTML = `
       <tr><td colspan="10" class="fsbody2 p8 ta-center">No Matching Application</td></tr>
       `;
    } else {
      studentsTableBody.innerHTML = "";
      filteredApps.forEach((app) => {
        const index = applications.findIndex((a) => a.email === app.email);

        const tableRow = document.createElement("tr");
        tableRow.className = "ba bc-100-300 p16 bar-md";
        tableRow.innerHTML = `
           <td>${app.fullName}</td>
           <td>${app.email}</td>
           <td>${app.phoneNumber}</td>
           <td>${app.DOB}</td>
           <td>${app.gender}</td>
           <td>${app.previousSchool}</td>
           <td>${app.classApplyingfor}</td>
           <td>${app.fullName}</td>
           <td>
           <span class="s-tag ${getStatusClass(app.status)}">${
          app.status || "Pending"
        }</span>
        </td>
        <td>
          <button type="button" class="s-btn s-btn__sm s-btn__muted" data-index="${index}">View</button>
        </td>
        `;
        const viewBtn = tableRow.querySelector("button");
        viewBtn.addEventListener("click", () => {
          showStudentDetails(applications[index], index);
        });

        studentsTableBody.appendChild(tableRow);
      });
    }
  }
  statusFilter.addEventListener("change", filterApplication);

  // Debounced search input
  let searchTimeout;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const searchValue = searchInput.value.toLowerCase();
      const filteredApps = applications.filter((app) => {
        return (
          app.fullName.toLowerCase().includes(searchValue) ||
          app.email.toLowerCase().includes(searchValue) ||
          app.classApplyingfor.toLowerCase().includes(searchValue)
        );
      });
      renderApplications(filteredApps);
    }, 300);
  });

  // Initial render
  renderApplications(applications);
});

// this fuction will update the status of the applicant on the DOM
function getStatusClass(status) {
  if (status == "Approved") return "s-tag__success";
  if (status == "Rejected") return "s-tag__danger";
  return "s-tag__info";
}
