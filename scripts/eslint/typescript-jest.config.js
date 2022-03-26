const typescriptBaseRules = require("./typescript.base.rules.js");

module.exports = {
  files: ["**/(__tests__)/**/*.{ts}", "**/?(*.)+(spec|specs|test).{ts}"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: "./",
    sourceType: "module"
  },
  env: {
    "browser": true,
    "es6": true,
    "node": true,
    "jest/globals": true
  },
  extends: [
    "airbnb-typescript/base",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:promise/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:sonarjs/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["@typescript-eslint", "import", "jest", "only-warn", "prettier"],
  settings: {
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".*", ".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/", "./"]
      }
    }
  },
  rules: {
    ...typescriptBaseRules
  }
};
