/** @format */

// Redirect if not logged in or not admin
const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user || user.role !== "admin") {
  window.location.href = "login.html";
}

// Logout functionality

// Utility: Returns tag class based on status
function getStatusClass(status) {
  if (status === "Approved") return "s-tag__success";
  if (status === "Rejected") return "s-tag__danger";
  return "s-tag__info"; // Default: Pending or undefined
}

// Utility: Filter applications based on search input and status filter
function getFilteredApplications(applications, searchValue, selectedStatus) {
  return applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchValue) ||
      app.email.toLowerCase().includes(searchValue) ||
      app.classApplyingfor.toLowerCase().includes(searchValue);

    let matchesStatus = false;

    if (selectedStatus === "All") {
      matchesStatus = true;
    } else if (
      selectedStatus === "Pending" &&
      (!app.status || app.status === "Pending")
    ) {
      matchesStatus = true;
    } else {
      matchesStatus = app.status === selectedStatus;
    }

    return matchesSearch && matchesStatus;
  });
}

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  const statusFilter = document.getElementById("status-filter");
  const searchInput = document.getElementById("search-input");
  const studentsTableBody = document.getElementById("studentsTableBody");
  const studentDetailsContainer = document.getElementById(
    "studentDetailsContainer"
  );
  const viewModal = document.getElementById("view-modal");
  const closeModalBtn = document.getElementById("closeModal");
  const exportCSVButton = document.getElementById("export-csv");
  const exportPDFButton = document.getElementById("export-pdf");
  const logoutBtn = document.getElementById("log-out");
  const yesLogoutBtn = document.getElementById("yes-logout");
  const noLogoutBtn = document.getElementById("no-logout");
  const logoutModal = document.getElementById("logout-modal");

  logoutBtn.addEventListener("click", () => {
    if (viewModal) {
      viewModal.classList.remove("d-none");
      document.getElementById("view-applicant-modal").classList.add("d-none");
      logoutModal.classList.remove("d-none");
    }
  });
  document.getElementById("view-applicant-modal").classList.remove("d-none");
  // yesLogoutBtn.addEventListener("click", () => {
  //   localStorage.removeItem("loggedInUser");
  //   window.location.href = "index.html";
  // });
  noLogoutBtn.addEventListener("click", () => {
    if (viewModal) {
      viewModal.classList.add("d-none");
    } else {
      document.getElementById("view-applicant-modal").classList.add("d-none");
    }
  });

  exportPDFButton.addEventListener("click", () => {
    const searchValue = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;

    const filteredApps = applications.filter((app) => {
      const matchesSearch =
        app.fullName.toLowerCase().includes(searchValue) ||
        app.email.toLowerCase().includes(searchValue) ||
        app.classApplyingfor.toLowerCase().includes(searchValue);

      const matchesStatus =
        selectedStatus === "All" || app.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
    if (filteredApps.length === 0) {
      alert("No Application to Export");
    }
    const headers = [
      "Full Name",
      "Email",
      "Phone Number",
      "DOB",
      "Gender",
      "Address",
      "Previous School",
      "Class Applying",
      "Status",
    ];

    let csvContent = headers.join(",") + "\n";
  });

  exportCSVButton.addEventListener("click", () => {
    const searchValue = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;

    const filteredApps = applications.filter((app) => {
      const matchesSearch =
        app.fullName.toLowerCase().includes(searchValue) ||
        app.email.toLowerCase().includes(searchValue) ||
        app.classApplyingfor.toLowerCase().includes(searchValue);

      const matchesStatus =
        selectedStatus === "All" || app.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });

    if (filteredApps.length === 0) {
      alert("No Application to Export");
    }
    // define CSV header

    const headers = [
      "Full Name",
      "Email",
      "Phone Number",
      "DOB",
      "Gender",
      "Address",
      "Previous School",
      "Class Applying",
      "Status",
    ];

    let csvContent = headers.join(",") + "\n";

    //  append each row
    filteredApps.forEach((app) => {
      const row = [
        app.fullName,
        app.email,
        app.phoneNumber,
        app.DOB,
        app.gender,
        app.address,
        app.previousSchool,
        app.classApplyingfor,
        app.status,
      ];
      csvContent += row.join(",") + "\n";
    });
    // a blob for download
    const blob = new Blob([csvContent], {
      type: "text/csv;chartset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    // a tempoary link that trigger download
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "applications.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  const applications =
    JSON.parse(localStorage.getItem("admissionApplication")) || [];
  let currentAppIndex = null;

  // Render applications in table
  function renderApplications(appList) {
    studentsTableBody.innerHTML = "";

    if (appList.length === 0) {
      studentsTableBody.innerHTML = `
        <tr><td colspan="10" class="fsbody2 p8 ta-center">No Applications Found</td></tr>
      `;
      return;
    }

    appList.forEach((app, index) => {
      const tableRow = document.createElement("tr");
      tableRow.className = "ba bc-100-300 p16 bar-md";
      tableRow.innerHTML = `
        <td>${app.fullName}</td>
        <td>${app.email}</td>
        <td>${app.phoneNumber}</td>
        <td>${app.DOB}</td>
        <td>${app.gender}</td>
        <t>${app.address}</t>
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

    attachViewHandlers(appList);
  }

  // Attach click event for each "View" button
  function attachViewHandlers(appList) {
    const viewButtons = studentsTableBody.querySelectorAll(".view-btn");
    viewButtons.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        currentAppIndex = i;
        showStudentDetails(appList[i], i);
      });
    });
  }

  //Show application details in modal
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
    logoutModal.classList.add("d-none");

    // Add click handlers for approval/rejection
    document.getElementById("approve-btn").onclick = () =>
      updateApplicationStatus(index, "Approved");

    document.getElementById("reject-btn").onclick = () =>
      updateApplicationStatus(index, "Rejected");
  };

  // ✅ Update status and re-render
  function updateApplicationStatus(index, status) {
    applications[index].status = status;
    localStorage.setItem("admissionApplication", JSON.stringify(applications));
    renderApplications(applications);
    viewModal.classList.add("d-none");
  }

  // ✅ Hide modal on close
  closeModalBtn.addEventListener("click", () => {
    viewModal.classList.add("d-none");
  });

  // ✅ Filter when dropdown changes
  statusFilter.addEventListener("change", () => {
    const filtered = getFilteredApplications(
      applications,
      searchInput.value.toLowerCase(),
      statusFilter.value
    );
    renderApplications(filtered);
  });

  // ✅ Debounced search
  let searchTimeout;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const filtered = getFilteredApplications(
        applications,
        searchInput.value.toLowerCase(),
        statusFilter.value
      );
      renderApplications(filtered);
    }, 300);
  });

  // ✅ Initial render
  renderApplications(applications);
});
