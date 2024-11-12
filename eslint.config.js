import js from '@eslint/js';
import globals from 'globals';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';

const baseESLintConfig = {
  name: 'eslint',
  extends: [js.configs.recommended],
  plugins: {
    perfectionist,
  },
  rules: {
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        groups: [
          'type',
          ['builtin', 'external'],
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'object',
          'style',
          'unknown',
        ],
      },
    ],
    curly: ['error', 'all'],
  },
};

const typescriptConfig = {
  name: 'typescript',
  extends: [...tseslint.configs.recommendedTypeChecked],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: { modules: true },
      ecmaVersion: 'latest',
      project: ['tsconfig.json', 'tsconfig.node.json', 'tsconfig.app.json'],
    },
    globals: {
      ...globals.builtin,
      ...globals.browser,
      ...globals.es2025,
    },
  },
  linterOptions: {
    reportUnusedDisableDirectives: 'error',
  },
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'no-public',
        overrides: { constructors: 'off' },
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      { ignoreArrowShorthand: true, ignoreVoidOperator: true },
    ],
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/naming-convention': [
      'error',
      /** Matches the same as class, enum, interface, typeAlias, typeParameter. */
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },

      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: { regex: '^I[A-Z]', match: false },
      },
      /* Boolean variables are prefixed with an allowed verb */
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
        filter: {
          regex: '^([A-Z_]+)',
          match: false,
        },
      },
    ],
    '@typescript-eslint/no-useless-empty-export': 'error',
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    'no-return-await': 'off',
    '@typescript-eslint/return-await': 'error',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
  },
};

const reactConfig = {
  name: 'react',
  extends: [eslintPluginReact.configs.flat['jsx-runtime']],
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};

const jsxA11yConfig = {
  name: 'jsxA11y',
  ...jsxA11yPlugin.flatConfigs.recommended,
  plugins: {
    'jsx-a11y': jsxA11yPlugin,
  },
  rules: {
    'jsx-a11y/alt-text': ['error', { elements: ['img'], img: ['Image'] }],
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
  },
};

const eslintConfig = tseslint.config(
  baseESLintConfig,
  typescriptConfig,
  reactConfig,
  jsxA11yConfig,
  eslintConfigPrettier,
);

eslintConfig.map((config) => {
  config.files = ['src/**/*.ts', 'src/**/*.tsx'];
  config.ignores = ['*.cjs', '*.js', '*.d.ts', 'node_modules/', 'public/', 'build/', 'dist/', 'coverage/', 'docker/'];
});

export default eslintConfig;
