module.exports = {
  parser: 'babel-eslint',
  env: {
    node: true,
    browser: true,
  },
  parserOptions: {
    allowImportExportEverywhere: true,
  },
  plugins: ['meteor', 'import', 'react'],
  extends: ['eslint:recommended', 'plugin:meteor/recommended', 'prettier'],
  rules: {
    'no-unused-vars': 'off',
    eqeqeq: 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'prefer-template': 'error',
    'object-shorthand': 'error',
    'no-console': 'off',
  },
  settings: {
    'import/resolver': 'meteor',
  },
};
