export function Button({ variant = "primary", type = "button", children, ...props }) {
  return (
    <button type={type} className={`keel-button keel-button-${variant}`} {...props}>
      {children}
    </button>
  );
}
