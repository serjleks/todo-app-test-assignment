const typescriptBaseRules = require("./typescript.base.rules.js");

module.exports = {
  files: ["**/+(__tests__)/**/*.+(tsx)", "**/?(*.)+(spec|specs|test).+(tsx)"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: "./",
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
    "airbnb-typescript",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:promise/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:sonarjs/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["@typescript-eslint", "import", "jest", "only-warn", "prettier"],
  settings: {
    "react": {
      version: "detect"
    },
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".*", ".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/", "./"]
      }
    }
  },
  rules: {
    ...typescriptBaseRules,
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-filename-extension": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/prop-types": "off"
  }
};
