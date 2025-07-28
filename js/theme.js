/** @format */

document.addEventListener("DOMContentLoaded", () => {
  
  const toggleButton = document.getElementById("toggle-button");
  const themeIcon = document.getElementById("theme-icon");
  const DARK_MODE_CLASS = "dark-mode";
  const LIGHT_MODE_CLASS = "light-mode";

  // Check if a theme is saved in localStorage, default to "light" if not
  const savedTheme = localStorage.getItem("theme") || "light";

  // Apply the saved theme to the body and set the icon
  if (savedTheme === "dark") {
    document.body.classList.add(DARK_MODE_CLASS);
    themeIcon.textContent = "☀️"; // Sun icon for dark mode
  } else {
    document.body.classList.add(LIGHT_MODE_CLASS);
    themeIcon.textContent = "🌙"; // Moon icon for light mode
  }

  // When the toggle button is clicked, switch between dark and light modes
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      const isCurrentlyDark = document.body.classList.contains(DARK_MODE_CLASS);

      if (isCurrentlyDark) {
        // Switch to light mode
        document.body.classList.replace(DARK_MODE_CLASS, LIGHT_MODE_CLASS);
        localStorage.setItem("theme", "light");
        themeIcon.textContent = "🌙";
      } else {
        // Switch to dark mode
        document.body.classList.replace(LIGHT_MODE_CLASS, DARK_MODE_CLASS);
        localStorage.setItem("theme", "dark");
        themeIcon.textContent = "☀️";
      }
    });
  }
});
