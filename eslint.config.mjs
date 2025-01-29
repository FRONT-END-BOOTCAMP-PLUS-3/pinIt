import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['node_modules/**', '.next/**', 'public/**'], // 무시할 경로 설정
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // any타입 에러 이슈 제거
    },
  },
];

export default eslintConfig;
