/// <reference types="vitest" />
import { defineWorkspace } from "vitest/config";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import path from "node:path";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const apps = path.resolve(dirname, "apps");

const SRC = path.resolve(dirname, "");

function getFoldersSync(dirPath: string) {
  const files = fs.readdirSync(dirPath);
  const folders = files.filter((file) => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    return stats.isDirectory();
  });

  return folders;
}

// console.log("getFoldersSync(apps)", getFoldersSync(apps));

const testProjectConfigurations = getFoldersSync(apps).map((appName) => {
  console.log("path.resolve(apps, appName)", path.resolve(apps, appName));

  return {
    test: {
      root: path.resolve(apps, appName),
      environment: "jsdom",
      name: appName,
    },
  };
});

export default defineWorkspace([...testProjectConfigurations]);
