const javascriptBaseRules = require("./javascript.base.rules.js");

module.exports = {
  files: ["**/+(__tests__)/**/*.+(jsx)", "**/?(*.)+(spec|specs|test).+(jsx)"],
  parserOptions: {
    ecmaVersion: "2021",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    "browser": true,
    "es6": true,
    "node": true,
    "jest/globals": true
  },
  extends: [
    "airbnb",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:promise/recommended",
    "plugin:sonarjs/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["import", "jest", "only-warn", "prettier"],
  settings: {
    "react": {
      version: "detect"
    },
    "import/resolver": {
      node: {
        extensions: [".*", ".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/", "./"]
      }
    }
  },
  rules: {
    ...javascriptBaseRules,
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-filename-extension": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/prop-types": "off"
  }
};
