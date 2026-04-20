const js = require('@eslint/js');
const globals = require('globals');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const importPlugin = require('eslint-plugin-import');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  // Base recommended rules (replaces eslint:recommended)
  js.configs.recommended,

  // Global ignores
  {
    ignores: [
      'node_modules/**',
      'public/**',
      '.cache/**',
      'static/**',
    ],
  },

  // Main config for JS/JSX files
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          paths: ['src'],
        },
      },
    },
    rules: {
      // --- React rules (from airbnb + custom overrides) ---
      ...reactPlugin.configs.recommended.rules,
      'react/prop-types': 'error',
      'react/no-array-index-key': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-danger': 'off',
      'react/forbid-prop-types': 'off',
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+ JSX transform
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandLast: true,
          noSortAlphabetically: true,
        },
      ],

      // --- React Hooks rules (from airbnb/hooks) ---
      ...reactHooksPlugin.configs.recommended.rules,

      // --- Import rules ---
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '.storybook/**',
            'src/components/**/*.stories.js',
            'src/components/**/*.stories.jsx',
            'eslint.config.js',
            'gatsby-config.js',
            'gatsby-node.js',
            'gatsby-ssr.js',
            'gatsby-browser.js',
            'postcss.config.js',
            'tailwind.config.js',
          ],
        },
      ],
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',

      // --- Accessibility rules ---
      ...jsxA11yPlugin.configs.recommended.rules,
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          required: {
            some: ['nesting', 'id'],
          },
        },
      ],

      // --- Core JS rules (key airbnb rules + custom overrides) ---
      'no-restricted-exports': ['error', { restrictedNamedExports: ['then'] }],
      'no-unused-vars': 'error',
      'no-shadow': 'off',
      'no-undef': 'error',
      'no-console': 'warn',
      'no-param-reassign': ['error', { props: false }],
      'no-underscore-dangle': 'off',
      'prefer-const': 'error',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      curly: ['error', 'multi-line'],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
    },
  },

  // Prettier must be last to override formatting rules
  prettierConfig,
];
