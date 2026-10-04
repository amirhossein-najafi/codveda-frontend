const form = document.querySelector("#signup");
const success = document.querySelector("#success");
const successCopy = document.querySelector("#success-copy");
const passwordInput = document.querySelector("#password");
const togglePassword = document.querySelector("#toggle-password");
const meterBar = document.querySelector("#meter-bar");
const strengthLabel = document.querySelector("#strength-label");

const fields = {
  name: {
    input: document.querySelector("#name"),
    error: document.querySelector("#name-error"),
    validate(value) {
      const name = value.trim();
      if (!name) return "Name is required.";
      if (name.length < 2) return "Use at least 2 characters.";
      if (!/^[\p{L}][\p{L}\s.'-]{1,}$/u.test(name)) {
        return "Use letters, spaces, apostrophes, or hyphens.";
      }
      return "";
    },
  },
  email: {
    input: document.querySelector("#email"),
    error: document.querySelector("#email-error"),
    validate(value) {
      const email = value.trim();
      if (!email) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        return "Enter a valid email address.";
      }
      return "";
    },
  },
  phone: {
    input: document.querySelector("#phone"),
    error: document.querySelector("#phone-error"),
    validate(value) {
      const phone = value.trim();
      if (!phone) return "Phone number is required.";
      const digits = phone.replace(/\D/g, "");
      if (!/^[+\d][\d\s()-]*$/.test(phone) || digits.length < 10 || digits.length > 15) {
        return "Enter 10 to 15 digits, with an optional leading +.";
      }
      return "";
    },
  },
  password: {
    input: passwordInput,
    error: document.querySelector("#password-error"),
    validate(value) {
      if (!value) return "Password is required.";
      if (scorePassword(value).score < 3) {
        return "Use 8+ characters with upper, lower, and a number.";
      }
      return "";
    },
  },
};

function scorePassword(value) {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];
  return { score, label: value ? labels[score] : "Strength appears as you type." };
}

function paintStrength(value) {
  const { score, label } = scorePassword(value);
  const colors = ["#8d2f2f", "#8d2f2f", "#a15c2a", "#2d6a4f", "#1f4d3a"];
  meterBar.style.width = value ? `${(score / 4) * 100}%` : "0";
  meterBar.style.background = colors[score];
  strengthLabel.textContent = label;
}

function showError(field, message) {
  field.error.textContent = message;
  field.input.classList.toggle("is-invalid", Boolean(message));
  field.input.classList.toggle("is-valid", !message && field.input.value.trim() !== "");
  field.input.setAttribute("aria-invalid", message ? "true" : "false");
  if (message) field.input.setAttribute("aria-describedby", field.error.id);
}

function validateField(key, { report }) {
  const field = fields[key];
  const message = field.validate(field.input.value);
  if (report || field.input.dataset.touched === "true") showError(field, message);
  return message === "";
}

Object.entries(fields).forEach(([key, field]) => {
  field.input.addEventListener("focus", () => {
    field.input.dataset.focused = "true";
  });

  field.input.addEventListener("blur", () => {
    field.input.dataset.touched = "true";
    field.input.dataset.focused = "false";
    validateField(key, { report: true });
  });

  field.input.addEventListener("input", () => {
    if (key === "password") paintStrength(field.input.value);
    if (field.input.dataset.touched === "true") validateField(key, { report: true });
  });
});

togglePassword.addEventListener("click", () => {
  const showing = passwordInput.type === "text";
  passwordInput.type = showing ? "password" : "text";
  togglePassword.textContent = showing ? "Show" : "Hide";
  togglePassword.setAttribute("aria-pressed", String(!showing));
  passwordInput.focus();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const results = Object.keys(fields).map((key) => {
    fields[key].input.dataset.touched = "true";
    return validateField(key, { report: true });
  });
  const ok = results.every(Boolean);
  if (!ok) {
    const firstInvalid = form.querySelector(".is-invalid");
    firstInvalid?.focus();
    return;
  }

  const name = fields.name.input.value.trim();
  successCopy.textContent = `${name}, your Passage account can be created. Nothing was sent to a server.`;
  form.hidden = true;
  success.hidden = false;
  success.querySelector("h2").focus?.();
});

document.querySelector("#reset-form").addEventListener("click", () => {
  form.reset();
  paintStrength("");
  Object.values(fields).forEach((field) => {
    field.input.dataset.touched = "false";
    field.input.classList.remove("is-invalid", "is-valid");
    field.input.removeAttribute("aria-invalid");
    field.error.textContent = "";
  });
  success.hidden = true;
  form.hidden = false;
  fields.name.input.focus();
});
