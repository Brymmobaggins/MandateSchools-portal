/** @format */

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  toggleBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("d-none");
  });
});
