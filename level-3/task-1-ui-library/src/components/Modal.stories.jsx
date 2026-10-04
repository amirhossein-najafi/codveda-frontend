import { useState } from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";

export default {
  title: "Modal",
  component: Modal,
};

export const Dialog = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Modal open={open} title="Save changes" onClose={() => setOpen(false)}>
          <p>This dialog uses the native dialog element, so focus stays inside it.</p>
        </Modal>
      </>
    );
  },
};
