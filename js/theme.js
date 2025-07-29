/** @format */

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-button");
  const themeIcon = document.getElementById("theme-icon");
  const DARK = "dark-mode";
  const LIGHT = "light-mode";

  // Detect system preference
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const savedTheme =
    localStorage.getItem("theme") || (systemPrefersDark ? "dark" : "light");

  // Apply theme to body and icon
  if (savedTheme === "dark") {
    document.body.classList.add(DARK);
    document.body.classList.remove(LIGHT);
    themeIcon.textContent = "☀️";
  } else {
    document.body.classList.add(LIGHT);
    document.body.classList.remove(DARK);
    themeIcon.textContent = "🌙";
  }

  // Theme toggle logic
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      const isDark = document.body.classList.contains(DARK);
      document.body.classList.toggle(DARK);
      document.body.classList.toggle(LIGHT);

      const newTheme = isDark ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      themeIcon.textContent = newTheme === "dark" ? "☀️" : "🌙";
    });
  }
});
