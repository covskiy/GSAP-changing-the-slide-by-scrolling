import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import css from '@eslint/css';
import html from '@html-eslint/eslint-plugin';
import prettierPlugin from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist/**', 'build/**']),
  {
    name: 'Javascript config',
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  {
    name: 'Typescript config',
    files: ['src/**/*.{ts,mts,cts}'],
    plugins: { tseslint },
    extends: ['tseslint/recommended'],
    languageOptions: { globals: globals.browser },
  },
  {
    name: 'CSS config',
    files: ['src/**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
    languageOptions: {
      // Включить при работе с postCSS плагинами
      // для случаев когда используется специфичный синтаксис
      // tolerant: true,
    },
  },
  {
    files: ['**/*.html'],
    plugins: {
      html,
    },
    // When using the recommended rules (or "html/all" for all rules)
    extends: ['html/recommended'],
    language: 'html/html',
    rules: {
      'html/indent': 'off',
      'html/require-closing-tags': ['error', { selfClosing: 'always' }],
      'html/no-extra-spacing-attrs': [
        'error',
        { enforceBeforeSelfClose: true },
      ],
      'html/attrs-newline': 'off',
    },
  },
  prettierPlugin,
]);
