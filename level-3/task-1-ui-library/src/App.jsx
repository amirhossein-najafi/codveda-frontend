import { useState } from "react";
import { Button, Card, Input, Modal } from "./index";

export default function App() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const emailError = email && !email.includes("@") ? "Enter an email address." : "";

  return (
    <main className="demo">
      <p className="eyebrow">Keel UI</p>
      <h1>Components you can ship twice.</h1>
      <div className="stack">
        <Card title="A quiet card">
          <p>Cards, buttons, fields, and a dialog. The same pieces Storybook documents.</p>
        </Card>
        <div className="row">
          <Button onClick={() => setOpen(true)}>Open dialog</Button>
          <Button variant="quiet">Secondary</Button>
          <Button variant="danger">Remove</Button>
        </div>
        <Input
          id="email"
          label="Email"
          hint="Used only for this demo."
          error={emailError}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <Modal open={open} title="Keep this note?" onClose={() => setOpen(false)}>
        <p>Focus stays inside the dialog until you close it or press Escape.</p>
      </Modal>
      <footer>Built by Amirhossein Najafi — Codveda Front-End Internship</footer>
    </main>
  );
}
