import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'

export default defineConfig([
  {
    name: 'debug-utils/files-to-lint',
    files: ['**/*.{js,mjs}'],
  },

  globalIgnores(['**/coverage/**', '**/node_modules/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  js.configs.recommended,

  eslintConfigPrettier,

  {
    rules: {
      'no-unused-vars': 'warn',
      'prefer-const': 'warn',
      // Логирование в консоль — назначение этого пакета, поэтому разрешено.
      'no-console': 'off',
    },
  },
])
