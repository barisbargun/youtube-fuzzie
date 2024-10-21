module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  plugins: ['simple-import-sort', 'import', 'prettier', 'tailwindcss'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'tailwindcss/enforces-shorthand': 'error',
    'tailwindcss/no-unnecessary-arbitrary-value': 'error',
  }
}
