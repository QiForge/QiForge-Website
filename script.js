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

