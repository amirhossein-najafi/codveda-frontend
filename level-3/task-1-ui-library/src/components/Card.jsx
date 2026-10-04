export function Card({ title, children }) {
  return (
    <article className="keel-card">
      {title ? <h3>{title}</h3> : null}
      {children}
    </article>
  );
}
