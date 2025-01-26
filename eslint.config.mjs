// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
/**
 * @see https://github.com/import-js/eslint-plugin-import/issues/1174
 */
import path from 'node:path';
import fs from 'node:fs';

const PACKAGES_DIR = 'packages';
const APPS_DIR = 'apps';
const WORKSPACES = [APPS_DIR, PACKAGES_DIR];

/**
 *
 * @param {string} dir
 * @returns {string}
 */
const getAbsPath = (dir) => path.resolve(__dirname, dir);

/**
 *
 * @param {string} dir
 * @returns {string[]}
 */
const getFolders = (dir) =>
  fs
    .readdirSync(dir)
    .filter(
      (entry) =>
        entry.substring(0, 1) !== '.' && fs.lstatSync(path.resolve(dir, entry)).isDirectory(),
    );

const importResolvers = WORKSPACES.map(getAbsPath)
  .map((dir) => getFolders(dir).map((folder) => path.resolve(dir, folder, 'tsconfig.json')))
  .flat();

const importExtraneousDirs = WORKSPACES.map(getAbsPath)
  .map((dir) => getFolders(dir).map((folder) => path.resolve(dir, folder)))
  .flat();

export default tseslint.config(eslint.configs.recommended, tseslint.configs.recommended);
