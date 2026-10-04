const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");
const toTop = document.querySelector(".to-top");

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  toggle.querySelector(".sr-only").textContent = open ? "Open menu" : "Close menu";
  nav.classList.toggle("is-open", !open);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.querySelector(".sr-only").textContent = "Open menu";
    nav.classList.remove("is-open");
  });
});

const onScroll = () => {
  toTop.hidden = window.scrollY < 480;
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
