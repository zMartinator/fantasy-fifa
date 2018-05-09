module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ['import'],
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
