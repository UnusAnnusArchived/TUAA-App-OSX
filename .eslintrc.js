module.exports = {
  extends: 'erb',
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'error',
    // Since React 17 and typescript 4.1 you can safely disable the rule
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-bind': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'react/prop-types': 'off',
    'class-methods-use-this': 'off',
    'react/no-array-index-key': 'off',
    'no-alert': 'off',
    'react/button-has-type': 'off',
    'no-nested-ternary': 'off',
    'eslint/always-return': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-plusplus': 'off',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
      },
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
