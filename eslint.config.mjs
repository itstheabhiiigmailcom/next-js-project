import pluginJs from '@eslint/js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */

const eslintConfig = [
  { files: ['**/*.{js,mjs,cjs,jsx,tsx,ts}'] },
  pluginJs.configs.recommended,
  ...compat.extends('next/core-web-vitals'),
];

export default eslintConfig;
