import { useEffect, useId, useRef } from "react";
import { Button } from "./Button";

export function Modal({ open, title, children, onClose }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="keel-dialog"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
    >
      <h2 id={titleId}>{title}</h2>
      {children}
      <div className="keel-dialog-actions">
        <Button variant="quiet" onClick={onClose}>
          Close
        </Button>
      </div>
    </dialog>
  );
}
