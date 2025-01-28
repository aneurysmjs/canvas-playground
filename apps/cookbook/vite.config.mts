import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(dirname, "src") }],
  },
});
