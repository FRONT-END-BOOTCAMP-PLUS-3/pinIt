module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb', // Airbnb 기본 스타일
    'airbnb-typescript', // TypeScript 지원
    'airbnb/hooks', // React Hooks 지원
    'next/core-web-vitals', // Next.js 권장 설정
    'plugin:prettier/recommended', // Prettier 통합
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json', // TypeScript 설정 파일 경로
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    'prettier/prettier': 'error', // Prettier 규칙 위반 시 에러 처리
    'react/react-in-jsx-scope': 'off', // React 17+에서는 필요하지 않음
    'import/prefer-default-export': 'off', // 기본 내보내기 강제 비활성화
    'react/prop-types': 'off', // PropTypes 대신 TypeScript 사용
  },
  ignorePatterns: ['node_modules/', '.next/', 'public/'],
};
