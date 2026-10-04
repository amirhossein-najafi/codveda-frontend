const countEl = document.querySelector("#count");
const noteEl = document.querySelector("#note");
const decrementBtn = document.querySelector("#decrement");
const resetBtn = document.querySelector("#reset");
const incrementBtn = document.querySelector("#increment");

let count = 0;

function render(message) {
  countEl.textContent = String(count);
  decrementBtn.disabled = count === 0;
  noteEl.textContent = message || (count === 0 ? "At zero" : "Counting");
  countEl.classList.remove("bump");
  void countEl.offsetWidth;
  countEl.classList.add("bump");
}

incrementBtn.addEventListener("click", () => {
  count += 1;
  render("");
});

decrementBtn.addEventListener("click", () => {
  if (count === 0) {
    render("The count stays at zero.");
    return;
  }
  count -= 1;
  render("");
});

resetBtn.addEventListener("click", () => {
  count = 0;
  render("Reset.");
});

render("");
