// Get elements
const themeToggle = document.getElementById("themeToggle");
const logotechpover = document.getElementById("logotechpover");
const favicon = document.getElementById("favicon");

// Matches system dark mode
const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// Check localStorage for an existing theme override
const storedTheme = localStorage.getItem("theme");

// 1) If we have a user-chosen theme in localStorage, apply it
if (storedTheme) {
  if (storedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.checked = true;
    favicon.src = "./img/techpoverfavicon.svg";
    logotechpover.src = "./img/techpoverLightLogo.svg";
  } else {
    document.body.classList.remove("dark-mode");
    themeToggle.checked = false;
    favicon.style.filter = "invert(0)";
    logotechpover.src = "./img/techpoverDarkLogo.svg";
  }
} else {
  // No stored theme, so rely on system preference
  applySystemTheme(darkModeMediaQuery);

  // Listen for system theme changes if user hasn't chosen manually
  darkModeMediaQuery.addEventListener("change", applySystemTheme);
}

// Function to apply system theme
function applySystemTheme(e) {
  if (e.matches) {
    // System is dark
    document.body.classList.add("dark-mode");
    themeToggle.checked = true; 
    logotechpover.src = "./img/techpoverLightLogo.svg";
  } else {
    // System is light
    document.body.classList.remove("dark-mode");
    themeToggle.checked = false;
    logotechpover.src = "./img/techpoverDarkLogo.svg";
  }
}

// 2) Let the user override via the toggle checkbox
themeToggle.addEventListener("change", function () {
  if (themeToggle.checked) {
    // User wants dark
    document.body.classList.add("dark-mode");
    logotechpover.src = "./img/techpoverLightLogo.svg";
    favicon.src = "./img/techpoverfavicon.svg";
    localStorage.setItem("theme", "dark");
  } else {
    // User wants light
    document.body.classList.remove("dark-mode");
    logotechpover.src = "./img/techpoverDarkLogo.svg";
    favicon.style.filter = "invert(0)";
    localStorage.setItem("theme", "light");
  }
});

let currentScroll = 0;
let targetScroll = 0;

function onScroll() {
  // The actual scroll position
  targetScroll = window.pageYOffset || document.documentElement.scrollTop;
}

function animateWave() {
  // Ease factor determines how quickly we catch up (0.1 is quite smooth).
  const ease = 0.1;
  currentScroll += (targetScroll - currentScroll) * ease;

  const waveX = -(currentScroll * 0.2);
  const waveY = currentScroll * 0.5;

  document.body.style.setProperty("--wave-x", waveX + "px");
  document.body.style.setProperty("--wave-y", waveY + "px");
  requestAnimationFrame(animateWave);
}

window.addEventListener("scroll", onScroll);

onScroll();
requestAnimationFrame(animateWave);

const sections = document.querySelectorAll("section[data-bg-class]");

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[data-bg-class]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.body.classList.remove("bg-alt", "bg-altthird");   
          const bgClass = entry.target.dataset.bgClass; 
          if (bgClass) {
            document.body.classList.add(bgClass);
          }
        }
      });
    },  { threshold: [0.3, 0.6] });
    sections.forEach(section => observer.observe(section));
});


let isScrolling;
window.addEventListener('scroll', () => {
  window.clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    onScroll(); // Call your scroll function after user stops scrolling
  }, 100);
});

document.addEventListener("DOMContentLoaded", function () {
  const footerContent = document.querySelector(".footer-content");
  const footerSection = document.querySelector("#footercontent");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footerContent.classList.add("animate"); // Add the animation class
        } else {
          footerContent.classList.remove("animate"); // Remove the class when out of view
        }
      });
    },
    {
      root: null, // Use the viewport as the root
      threshold: 0.1, // Trigger when 10% of the footer is visible
    }
  );

  observer.observe(footerSection);
});



function updateFooterImage() {
  const footerImg = document.querySelector(".footer-lines");
  
  if (window.innerWidth <= 768) {
    footerImg.src = "/img/footermobile.png"; 
  } else {
    footerImg.src = "/img/footershape.svg";  
  }
}

// Run when the page loads
updateFooterImage();

// Run when window resizes
window.addEventListener("resize", updateFooterImage);
