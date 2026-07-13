// ===== Year in footer =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Navbar scroll state =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// ===== Mobile nav toggle =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");
navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ===== Cursor glow follows pointer (desktop only) =====
const cursorGlow = document.getElementById("cursorGlow");
const hasHover = window.matchMedia("(hover: hover)").matches;
if (hasHover) {
  window.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
  });
} else {
  cursorGlow.style.display = "none";
}

// ===== Scroll progress bar (fills as page "loads" while you scroll) =====
const progressBar = document.getElementById("scrollProgressBar");
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + "%";
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

// ===== 3D tilt effect on cards (desktop only) =====
if (hasHover) {
  const tiltEls = document.querySelectorAll(".tilt");
  const MAX_TILT = 8; // degrees
  const LIFT = 8; // px

  tiltEls.forEach((el) => {
    el.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0 -> 1
      const y = (e.clientY - rect.top) / rect.height; // 0 -> 1
      const rotateY = (x - 0.5) * MAX_TILT * 2;
      const rotateX = (0.5 - y) * MAX_TILT * 2;
      el.style.transition = "transform 0.08s linear";
      el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${LIFT}px) translateZ(10px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) translateZ(0)";
    });
  });
}

// ===== Scroll-triggered fade-ins =====
const fadeTargets = document.querySelectorAll(
  ".eyebrow, .section-title, .section-lead, .about-card, .stack-card, .project-card, .timeline-item, .achv-card, .edu-card, .contact-card, .achv-title",
);
fadeTargets.forEach((el) => el.classList.add("fade-in"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
);

fadeTargets.forEach((el) => observer.observe(el));

// stagger cards within the same grid slightly
document
  .querySelectorAll(".about-grid, .stack-grid, .achv-grid, .contact-grid")
  .forEach((grid) => {
    [...grid.children].forEach((child, i) => {
      child.style.transitionDelay = `${i * 90}ms`;
    });
  });

// ===== Smooth anchor scrolling with navbar offset =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.length < 2) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: offset, behavior: "smooth" });
  });
});
