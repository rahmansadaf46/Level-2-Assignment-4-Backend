const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const eslintPluginImport = require('eslint-plugin-import');

module.exports = [
  {
    files: ['src/**/*.{js,ts}'],
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'commonjs',
      },
      globals: {
        NodeJS: true,
        node: true,
        es2021: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: eslintPluginImport,
    },
    rules: {
      ...typescriptEslint.configs['recommended'].rules,
      //  'no-console': ['warn', { allow: ['info', 'error'] }],
      'no-console': 'off',

      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          ts: 'never',
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts'],
        },
      },
    },
  },
];