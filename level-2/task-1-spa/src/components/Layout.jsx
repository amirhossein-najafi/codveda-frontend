import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useDraft } from "../context/DraftContext";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { draft } = useDraft();
  const hasDraft = draft.message.trim().length > 0;

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <NavLink className="logo" to="/" onClick={() => setOpen(false)}>
          Orchard Press
        </NavLink>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="primary-nav" className={open ? "is-open" : undefined} aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      {hasDraft ? (
        <p className="draft-banner">
          A note{draft.name ? ` from ${draft.name}` : ""} is still open on the contact page.
        </p>
      ) : null}
      <main id="main">
        <div key={location.pathname} className="view">
          <Outlet />
        </div>
      </main>
      <footer>
        <p>Built by Amirhossein Najafi — Codveda Front-End Internship</p>
      </footer>
    </>
  );
}
