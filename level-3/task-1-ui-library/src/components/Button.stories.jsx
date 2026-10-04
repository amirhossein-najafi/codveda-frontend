import { Button } from "./Button";

export default {
  title: "Button",
  component: Button,
  args: { children: "Save note" },
};

export const Primary = {};

export const Quiet = {
  args: { variant: "quiet", children: "Cancel" },
};

export const Danger = {
  args: { variant: "danger", children: "Delete" },
};

export const Disabled = {
  args: { disabled: true, children: "Saving" },
};
