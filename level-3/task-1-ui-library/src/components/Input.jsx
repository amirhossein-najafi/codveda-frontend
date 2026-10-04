export function Input({ id, label, hint, error, ...props }) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="keel-field">
      <label htmlFor={id}>{label}</label>
      <input
        className="keel-input"
        id={id}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        {...props}
      />
      {hint ? (
        <p className="keel-hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="keel-error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
