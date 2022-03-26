const typescriptBaseRules = require("./typescript.base.rules.js");

module.exports = {
  files: ["*.ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: "./",
    sourceType: "module"
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "airbnb-typescript/base",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:promise/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:sonarjs/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["@typescript-eslint", "import", "only-warn", "prettier"],
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
