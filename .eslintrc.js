module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
        moduleDirectory: [
          'node_modules',
          'src'
        ],
      },
      webpack: {
        config: 'webpack.config.js',
      },
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      }
    },
  },
  globals: {
    React: true,
    ReactDOM: true,
    PropTypes: true,
    Webpack: true,
  },
  plugins: [
    '@typescript-eslint',
    'no-iife',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/webpack.config.js',
        ]
      }
    ],
    'no-iife/no-iife': 'error',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-use-before-define': 0,
    'spaced-comment': 0,
    /* typescript specific - disable base eslint, use @typescript-eslint */
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': ['error', { ignoreTypeValueShadow: true }],
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'import/extensions': 0,
    '@typescript-eslint/import/extensions': 0,
  },
  overrides: [{
    files: ["*.graphql"],
    parser: "@graphql-eslint/eslint-plugin",
    plugins: ["@graphql-eslint"],
    parserOptions: {
      schema: "./schemas/schema.graphql",
    },
  }],
};
