import "./style.css";

const toggle = document.querySelector("#nav-toggle");
const nav = document.querySelector("#site-nav");

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  toggle.textContent = open ? "Menu" : "Close";
  nav.classList.toggle("is-open", !open);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Menu";
    nav.classList.remove("is-open");
  });
});

document.querySelector("#visit form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(event.currentTarget).get("email");
  event.currentTarget.replaceWith(
    Object.assign(document.createElement("p"), {
      className: "mt-6",
      textContent: `We'll write to ${email} when batch 19 has a date.`,
    }),
  );
});
