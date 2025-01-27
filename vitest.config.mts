import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const SRC = path.resolve(dirname, "apps");

export default defineConfig({
  test: {
    include: [`${SRC}/**/*.test.ts?`],
    environment: "jsdom",
    env: process.env,
  },
  resolve: {
    alias: [{ find: "@", replacement: SRC }],
  },
});
