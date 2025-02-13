import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin'; // 패키지 변경
import tsParser from '@typescript-eslint/parser'; // TypeScript 파서 추가
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser, // TypeScript 파서 추가
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
  },
  pluginJs.configs.recommended,
  tseslint.configs.recommended, // TypeScript ESLint 적용
  pluginReact.configs.flat.recommended,
];
