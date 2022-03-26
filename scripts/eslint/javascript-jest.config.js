const javascriptBaseRules = require("./javascript.base.rules.js");

module.exports = {
  files: ["**/(__tests__)/**/*.{js}", "**/?(*.)+(spec|specs|test).{js}"],
  parserOptions: {
    ecmaVersion: "2021",
    sourceType: "module"
  },
  env: {
    "browser": true,
    "es6": true,
    "node": true,
    "jest/globals": true
  },
  extends: [
    "airbnb-base",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:promise/recommended",
    "plugin:sonarjs/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["import", "jest", "only-warn", "prettier"],
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
