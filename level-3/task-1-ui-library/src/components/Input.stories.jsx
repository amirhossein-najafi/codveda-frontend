import { Input } from "./Input";

export default {
  title: "Input",
  component: Input,
  args: {
    id: "studio-name",
    label: "Studio name",
    hint: "Shown on the packing slip.",
    placeholder: "North room",
  },
};

export const Default = {};

export const Invalid = {
  args: {
    id: "studio-email",
    label: "Email",
    hint: "",
    error: "Enter a valid email address.",
    defaultValue: "not-an-email",
  },
};
