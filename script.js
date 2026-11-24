/* =========================================
   1. Mobile Navigation Menu Toggle
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle =
    document.querySelector(".menu-toggle") ||
    document.querySelector(".hamburger") ||
    document.querySelector("#menu-toggle") ||
    document.querySelector("[data-menu-toggle]");

  const navLinks =
    document.querySelector(".nav-links") ||
    document.querySelector("nav ul") ||
    document.querySelector("#nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      navLinks.classList.toggle("active");
      navLinks.classList.toggle("open");
      navLinks.classList.toggle("show");

      const isExpanded =
        navLinks.classList.contains("active") ||
        navLinks.classList.contains("open") ||
        navLinks.classList.contains("show");
      menuToggle.setAttribute("aria-expanded", String(isExpanded));
    });

    // Close menu when clicking a navigation link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active", "open", "show");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navLinks.classList.remove("active", "open", "show");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* =========================================
     2. Active Link Highlighting on Scroll
     ========================================= */
  const sections = document.querySelectorAll("section[id]");
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  if (sections.length > 0 && anchorLinks.length > 0) {
    window.addEventListener(
      "scroll",
      () => {
        let currentSectionId = "";
        const scrollPosition = window.scrollY + 140;

        sections.forEach((section) => {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSectionId = section.getAttribute("id");
          }
        });

        anchorLinks.forEach((link) => {
          const href = link.getAttribute("href");
          if (href === `#${currentSectionId}`) {
            link.classList.add("active");
          } else if (href && href.startsWith("#") && href.length > 1) {
            link.classList.remove("active");
          }
        });
      },
      { passive: true }
    );
  }

  /* =========================================
     3. Clipboard Copy Functionality
     ========================================= */
  // Supports elements with class="copy-btn", data-copy="text to copy",
  // or data-copy-target="#element-id"
  const copyButtons = document.querySelectorAll(
    ".copy-btn, [data-copy], [data-copy-target]"
  );

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      let textToCopy = button.getAttribute("data-copy") || "";

      const targetSelector = button.getAttribute("data-copy-target");
      if (!textToCopy && targetSelector) {
        const targetEl = document.querySelector(targetSelector);
        if (targetEl) {
          textToCopy = targetEl.textContent.trim();
        }
      }

      // Fallback: look for an email/text element nearby if none specified
      if (!textToCopy) {
        const emailEl =
          button.parentElement?.querySelector("[data-email], .email-text, a[href^='mailto:']");
        if (emailEl) {
          textToCopy =
            emailEl.getAttribute("data-email") ||
            emailEl.textContent.replace(/^mailto:/i, "").trim();
        }
      }

      if (!textToCopy) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const tempInput = document.createElement("textarea");
          tempInput.value = textToCopy;
          tempInput.setAttribute("readonly", "");
          tempInput.style.position = "absolute";
          tempInput.style.left = "-9999px";
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);
        }

        const originalText = button.textContent;
        button.textContent = "Copied!";
        button.classList.add("copied");

        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove("copied");
        }, 2000);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    });
  });

  /* =========================================
     4. Dynamic Copyright Year (Optional)
     ========================================= */
  const yearEl = document.querySelector("#year, .current-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
});
