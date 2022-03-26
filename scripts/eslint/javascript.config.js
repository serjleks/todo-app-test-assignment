const javascriptBaseRules = require("./javascript.base.rules.js");

module.exports = {
  files: ["*.js"],
  parserOptions: {
    ecmaVersion: "2021",
    sourceType: "module"
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "airbnb-base",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:promise/recommended",
    "plugin:sonarjs/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["import", "only-warn", "prettier"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".*", ".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/", "./"]
      }
    }
  },
  rules: {
    ...javascriptBaseRules
  }
};
