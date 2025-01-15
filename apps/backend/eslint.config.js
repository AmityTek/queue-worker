import { ESLint } from 'eslint';
import eslintPluginNode from 'eslint-plugin-node';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginTypeScript from '@typescript-eslint/eslint-plugin';
import eslintParserTypeScript from '@typescript-eslint/parser';

export default [
  {
    ignores: ['node_modules', 'dist', '**/build'],
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTypeScript,
      node: eslintPluginNode,
      import: eslintPluginImport,
    },
    rules: {
      "no-console": "off",
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'node/no-missing-import': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          'newlines-between': 'always',
        },
      ],
      'no-console': 'warn',
    },
  },
];
