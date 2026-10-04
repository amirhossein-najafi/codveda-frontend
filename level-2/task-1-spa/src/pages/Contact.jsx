import { useState } from "react";
import { useDraft } from "../context/DraftContext";

export default function Contact() {
  const { draft, updateDraft, clearDraft } = useDraft();
  const [sent, setSent] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    if (!draft.name.trim() || !draft.email.trim() || !draft.message.trim()) return;
    setSent(true);
  }

  return (
    <article className="page">
      <p className="eyebrow">Contact</p>
      <h1>Write to the editors.</h1>
      <p className="lede">
        The draft stays in memory while you move between pages. Leaving this
        screen does not clear it.
      </p>
      {sent ? (
        <p className="confirm" role="status">
          Thanks, {draft.name.trim()}. We kept your note in this session only.
          <button
            type="button"
            onClick={() => {
              clearDraft();
              setSent(false);
            }}
          >
            Start over
          </button>
        </p>
      ) : (
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={draft.name}
            onChange={(event) => updateDraft({ name: event.target.value })}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={draft.email}
            onChange={(event) => updateDraft({ email: event.target.value })}
            required
          />
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={draft.message}
            onChange={(event) => updateDraft({ message: event.target.value })}
            required
          />
          <button className="button" type="submit">
            Send note
          </button>
        </form>
      )}
    </article>
  );
}
