const js = require("@eslint/js");
const pluginN = require("eslint-plugin-n");
const prettier = require("eslint-config-prettier");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  pluginN.configs["flat/recommended-script"],
  prettier,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        ...globals.jest, // fixes describe/it/expect not defined
      }
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "n/no-missing-import": "off",
      "n/no-unsupported-features/es-builtins": "off",
      "n/no-unpublished-require": "off" // fixes supertest complaint
    },
    ignores: ["coverage/**", "node_modules/**", "dist/**"]
  }
];
