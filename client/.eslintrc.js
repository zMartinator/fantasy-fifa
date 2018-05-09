module.exports = {
  extends: 'react-app',
  parser: 'babel-eslint',
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parserOptions: {
    allowImportExportEverywhere: true,
  },
  plugins: ['import', 'react'],
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'no-unused-vars': 'off',
    eqeqeq: 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'prefer-template': 'error',
    'object-shorthand': 'error',
    'no-console': 'off',
    'no-debugger': 'off',
  },
};
