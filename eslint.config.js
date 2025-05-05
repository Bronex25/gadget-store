import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import typescriptEslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint.plugin,
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      prettier,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...eslintPluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // ✅ disable for React 17+
      'prettier/prettier': 'error',
    },
    settings: {
      react: {
        version: 'detect',
        pragma: 'React',
        fragment: 'Fragment',
      },
    },
  },
  {
    ignores: ['node_modules', 'dist', '.husky', 'vite.config.ts', 'eslint.config.js'],
  },
];