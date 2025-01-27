// Get elements
const themeToggle = document.getElementById("themeToggle");
const logotechpover = document.getElementById("logotechpover");

// Matches system dark mode
const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// Check localStorage for an existing theme override
const storedTheme = localStorage.getItem("theme");

// 1) If we have a user-chosen theme in localStorage, apply it
if (storedTheme) {
  if (storedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.checked = true;
    logotechpover.src = "../img/techpoverLightLogo.svg";
  } else {
    document.body.classList.remove("dark-mode");
    themeToggle.checked = false;
    logotechpover.src = "../img/techpoverDarkLogo.svg";
  }
} else { 
  applySystemTheme(darkModeMediaQuery);
 
  darkModeMediaQuery.addEventListener("change", applySystemTheme);
} 
function applySystemTheme(e) {
  if (e.matches) {
    // System is dark
    document.body.classList.add("dark-mode");
    themeToggle.checked = true;
    logotechpover.src = "../img/techpoverLightLogo.svg";
  } else {
    // System is light
    document.body.classList.remove("dark-mode");
    themeToggle.checked = false;
    logotechpover.src = "../img/techpoverDarkLogo.svg";
  }
} 
themeToggle.addEventListener("change", function () {
  if (themeToggle.checked) {
    // User wants dark
    document.body.classList.add("dark-mode");
    logotechpover.src = "../img/techpoverLightLogo.svg";
    localStorage.setItem("theme", "dark");
  } else {
    // User wants light
    document.body.classList.remove("dark-mode");
    logotechpover.src = "../img/techpoverDarkLogo.svg";
    localStorage.setItem("theme", "light");
  }
}); 