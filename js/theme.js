/** @format */

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-button");
  const savedTheme = localStorage.getItem("theme");
  const DARK_MODE_CLASS = "dark-mode";
  const LIGHT_MODE_CLASS = "light-mode";

  // Apply saved theme or default to light mode
  if (savedTheme === "dark") {
    document.body.classList.add(DARK_MODE_CLASS);
  } else {
    document.body.classList.add(LIGHT_MODE_CLASS);
  }

  // Toggle theme on button click
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      const isDarkMode = document.body.classList.contains(DARK_MODE_CLASS);

      if (isDarkMode) {
        document.body.classList.replace(DARK_MODE_CLASS, LIGHT_MODE_CLASS);
        localStorage.setItem("theme", "light");
      } else {
        document.body.classList.replace(LIGHT_MODE_CLASS, DARK_MODE_CLASS);
        localStorage.setItem("theme", "dark");
      }
    });
  }
});
