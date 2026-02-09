const body = document.body;
const toggleButtons = document.querySelectorAll(".theme-toggle");
const revealItems = document.querySelectorAll("[data-reveal]");
const copyButtons = document.querySelectorAll("[data-copy]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  body.setAttribute("data-theme", storedTheme);
}

const setToggleState = (theme) => {
  toggleButtons.forEach((button) => {
    button.setAttribute("aria-pressed", theme === "nocturne" ? "true" : "false");
  });
};

setToggleState(body.getAttribute("data-theme"));

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const current = body.getAttribute("data-theme");
    const next = current === "nocturne" ? "" : "nocturne";
    if (next) {
      body.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    } else {
      body.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    }
    setToggleState(next);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.getAttribute("data-copy");
    if (!text) {
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Copied";
      setTimeout(() => {
        button.textContent = "Copy Email";
      }, 1500);
    } catch (error) {
      button.textContent = "Unable to Copy";
      setTimeout(() => {
        button.textContent = "Copy Email";
      }, 1500);
    }
  });
});

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 720) {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}
