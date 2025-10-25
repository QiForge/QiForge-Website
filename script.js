window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Ensure both carousels actually start animating once the page loads
window.addEventListener("load", () => {
  document.querySelectorAll(".team-track, .peek-track").forEach(track => {
    track.style.animationPlayState = "running";
  });
});

// SIDEBAR TOGGLE LOGIC
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuToggle = document.getElementById("menu-toggle"); // your hamburger button
const closeSidebar = document.getElementById("close-sidebar");

function openSidebar() {
  sidebar.classList.add("open");
  overlay.classList.add("active");
  overlay.hidden = false;
}

function closeSidebarMenu() {
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
  setTimeout(() => {
    overlay.hidden = true;
  }, 300);
}

if (menuToggle) {
  menuToggle.addEventListener("click", openSidebar);
}
if (closeSidebar) {
  closeSidebar.addEventListener("click", closeSidebarMenu);
}
if (overlay) {
  overlay.addEventListener("click", closeSidebarMenu);
}

// ==================================================
// Sneak Peek Parallax Tilt Effect
// ==================================================
const peekCards = document.querySelectorAll(".peek-card");

peekCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position within card
    const y = e.clientY - rect.top; // Y position within card

    const rotateX = ((y / rect.height) - 0.5) * -10; // up/down tilt
    const rotateY = ((x / rect.width) - 0.5) * 10;  // left/right tilt

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
  });

  card.addEventListener("mouseleave", () => {
    card.classList.add("reset");
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    setTimeout(() => card.classList.remove("reset"), 250);
  });
});

// ==================================================
// Accessibility: Disable focus on hidden sidebar
// ==================================================
function toggleSidebarAccessibility(isOpen) {
  const focusables = sidebar.querySelectorAll("a, button");
  focusables.forEach(el => el.tabIndex = isOpen ? 0 : -1);
}

function openSidebar() {
  sidebar.classList.add("open");
  overlay.classList.add("active");
  overlay.hidden = false;
  sidebar.setAttribute("aria-hidden", "false");
  toggleSidebarAccessibility(true);
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeSidebarMenu() {
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
  sidebar.setAttribute("aria-hidden", "true");
  toggleSidebarAccessibility(false);
  menuToggle.setAttribute("aria-expanded", "false");
  setTimeout(() => { overlay.hidden = true; }, 300);
}

// ==================================================
// Glassmorphic Floating Scroll / Back-to-Top Button
// ==================================================
const skipBtn = document.getElementById("skip-btn");
let lastState = "top"; // track current mode

window.addEventListener("scroll", () => {
  const isScrolled = window.scrollY > 300;

  if (isScrolled && lastState !== "bottom") {
    // Transition to bottom mode
    skipBtn.classList.add("fade-out");
    setTimeout(() => {
      skipBtn.classList.add("scrolled");
      skipBtn.innerHTML = "↑";
      skipBtn.setAttribute("href", "#top");
      skipBtn.setAttribute("aria-label", "Back to top");
      skipBtn.classList.remove("fade-out");
    }, 200);
    lastState = "bottom";
  } 
  else if (!isScrolled && lastState !== "top") {
    // Transition back to top mode
    skipBtn.classList.add("fade-out");
    setTimeout(() => {
      skipBtn.classList.remove("scrolled");
      skipBtn.innerHTML = "↓";
      skipBtn.setAttribute("href", "#next-section");
      skipBtn.setAttribute("aria-label", "Scroll down");
      skipBtn.classList.remove("fade-out");
    }, 200);
    lastState = "top";
  }
});

// Smooth scroll fallback for Safari
skipBtn.addEventListener("click", (e) => {
  const targetId = skipBtn.getAttribute("href");
  const targetEl = document.querySelector(targetId);
  if (targetEl) {
    e.preventDefault();
    window.scrollTo({
      top: targetEl.offsetTop - 70,
      behavior: "smooth",
    });
  }
});

// FAQ Accordion
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});
