/** @format */

document.addEventListener("DOMContentLoaded", function () {
  const title = document.getElementById("pageTitle");
  const form = document.getElementById("loginForm");
  const typeText = document.getElementById("loginType");
  const role = new URLSearchParams(window.location.search).get("role");

  if (!title || !typeText) {
    console.error("Error: Required DOM elements not found.");
    return;
  }

  if (role) {
    // get the first letter, convert it UpperCase, concatenate the rest to Lower case
    let displayRole = role[0].toUpperCase() + role.slice(1).toLowerCase();
    title.textContent = displayRole + " login";
    // typeText.textContent =  displayRole;
    // if role is admin use "an" for grammatical error
    // if (role === "admin") {
    //   typeText.textContent = "Login as an " + displayRole;
    // }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("user-input").value;
    const password = document.getElementById("user-password").value;

    const usersArray = [
      {
        username: "admin",
        password: "1234",
        role: "admin",
      },
      {
        username: "student",
        password: "xyz",
        role: "student",
      },
      {
        username: "teacher",
        password: "teacher123",
        role: "teacher",
      },
      {
        username: "parent",
        password: "parent123",
        role: "parent",  
      },
    ];

    // Save the array in localStorage
    localStorage.setItem("users", JSON.stringify(usersArray));

    // Retrieve the users localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log(users);

    // find user with match credential
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    
      if (foundUser.role === "admin") {
        window.location.href = "admin-dashboard.html";
        console.log("hello");
      } else if (foundUser.role === "student") {
        window.location.href = "student-dashboard.html";
      } else if (foundUser.role === "teacher") {
        window.location.href = "teacher-dashbord.html";
      } else if (foundUser.role === "parent") {
        window.location.href = "parent-dashboard.html";
      }
    } else {
      errorBox.textContent = "Invalid Credential, please try again!";
      errorBox.classList.remove("d-none");
    }
  });

  document.getElementById("user-input").addEventListener("input", () => {
    errorBox.classList.add("d-none");
  });

  document.getElementById("user-password").addEventListener("input", () => {
    errorBox.classList.add("d-none");
  });
});
