module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'only-multiline',
    }],
    '@typescript-eslint/explicit-function-return-type': 0,
  },
}
