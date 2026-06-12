import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',
      'node_modules/**',
      'components/ui/**',
      '*.log',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'prettier'),
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
];

export default eslintConfig;
