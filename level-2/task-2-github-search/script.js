const form = document.querySelector("#search-form");
const input = document.querySelector("#query");
const statusEl = document.querySelector("#status");
const resultsEl = document.querySelector("#results");

let timer = 0;
let controller = null;

function setStatus(message) {
  statusEl.textContent = message;
}

function clearResults() {
  resultsEl.replaceChildren();
}

function renderRepos(items) {
  clearResults();
  const fragment = document.createDocumentFragment();
  items.forEach((repo) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = repo.html_url;
    link.target = "_blank";
    link.rel = "noreferrer";

    const title = document.createElement("h2");
    title.textContent = repo.full_name;

    const description = document.createElement("p");
    description.textContent = repo.description || "No description provided.";

    const meta = document.createElement("p");
    meta.className = "meta";
    const language = document.createElement("span");
    language.textContent = repo.language || "Unknown language";
    const stars = document.createElement("span");
    stars.textContent = `${repo.stargazers_count.toLocaleString()} stars`;
    meta.append(language, stars);

    link.append(title, description, meta);
    item.append(link);
    fragment.append(item);
  });
  resultsEl.append(fragment);
}

async function search(query) {
  controller?.abort();
  controller = new AbortController();
  setStatus("Searching…");
  clearResults();

  try {
    const url = new URL("https://api.github.com/search/repositories");
    url.searchParams.set("q", query);
    url.searchParams.set("per_page", "8");
    url.searchParams.set("sort", "stars");

    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const message = body.message || `GitHub returned ${response.status}.`;
      throw new Error(message);
    }

    const data = await response.json();
    if (!data.items.length) {
      setStatus(`No repositories matched “${query}”.`);
      return;
    }

    setStatus(`${data.total_count.toLocaleString()} repositories. Showing ${data.items.length}.`);
    renderRepos(data.items);
  } catch (error) {
    if (error.name === "AbortError") return;
    setStatus(error.message || "The search could not be completed.");
    clearResults();
  }
}

function scheduleSearch() {
  window.clearTimeout(timer);
  const query = input.value.trim();
  controller?.abort();

  if (query.length < 2) {
    clearResults();
    setStatus(query ? "Type at least 2 characters." : "Results appear after you type.");
    return;
  }

  setStatus("Waiting to search…");
  timer = window.setTimeout(() => search(query), 300);
}

input.addEventListener("input", scheduleSearch);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  window.clearTimeout(timer);
  const query = input.value.trim();
  if (query.length < 2) {
    setStatus("Type at least 2 characters.");
    return;
  }
  search(query);
});

setStatus("Results appear after you type.");
