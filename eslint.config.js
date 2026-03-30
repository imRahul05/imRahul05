import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  {
    ignores: ['dist', 'node_modules', '**/*.d.ts'],
  },

  {
    languageOptions: {
      globals: globals.browser, // 👈 THIS FIXES IT
    },
  },
  // Base JS rules (safe for all files)
  js.configs.recommended,

  // ✅ Apply TS strict rules ONLY to TS files
  {
    files: ['**/*.{ts,tsx}'],

    ...tseslint.configs.strictTypeChecked[0],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier,
      'react-hooks': reactHooks,
    },

    rules: {
      // ❌ Disable base rule
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'off',

      // ✅ Use TS-aware rule
      '@typescript-eslint/no-unused-vars': ['warn'],

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'no-console': 'warn',
      'no-debugger': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],

      'prettier/prettier': 'error',
    },
  },

  // Prettier last
  prettierConfig,
];
