module.exports = {
  root: true,
  env: { node: true },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended',
  ],
  parserOptions: { ecmaVersion: 2020 },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    camelcase: 'off',
    'no-tabs': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'space-before-function-paren': 'off',
  },
}
