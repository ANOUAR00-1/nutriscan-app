const expoConfig = require('eslint-config-expo');

module.exports = [
  ...expoConfig,
  {
    ignores: ["dist/*", "node_modules/*"],
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
];
