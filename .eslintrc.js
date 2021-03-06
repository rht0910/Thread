module.exports = {
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  extends: 'eslint:recommended',
  rules: {
    'one-var': [2, 'never'],
    'no-var': 2,
    'prefer-const': 2,
    'no-console': 0,
    indent: [2, 2, {
      SwitchCase: 1
    }],
    'comma-dangle': [2, 'always-multiline'],
    quotes: [2, 'single'],
    semi: [2, 'never'],
    'prefer-arrow-callback': 2,
    'no-use-before-define': ['error', { 'functions': true, 'classes': true }],
    'eol-last': 2,
    'no-dupe-class-members': 0,
    'require-yield': 0,
  }
}
