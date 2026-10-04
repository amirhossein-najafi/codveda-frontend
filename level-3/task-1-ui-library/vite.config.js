import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: `${root}/src/index.js`,
      name: "KeelUI",
      fileName: "keel-ui",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
});
