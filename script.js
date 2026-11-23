// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    primaryNav.classList.toggle("is-open", !isExpanded);
  });

  // Close menu after clicking a navigation link on mobile
  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      primaryNav.classList.remove("is-open");
    });
  });
}

// Copy email address to clipboard
const copyEmailBtn = document.querySelector("#copy-email-btn");
const copyStatus = document.querySelector("#copy-status");

if (copyEmailBtn && copyStatus) {
  copyEmailBtn.addEventListener("click", async () => {
    const email = copyEmailBtn.dataset.email || "";
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      copyStatus.textContent = `Copied ${email} to clipboard.`;
    } catch {
      copyStatus.textContent = `Email: ${email}`;
    }
  });
}

// Dynamic footer year
const yearEl = document.querySelector("#year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
