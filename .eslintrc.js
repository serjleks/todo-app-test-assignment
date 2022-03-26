const javascriptConfig = require("./scripts/eslint/javascript.config.js");
const javascriptJestConfig = require("./scripts/eslint/javascript-jest.config.js");
const javascriptReactConfig = require("./scripts/eslint/javascript-react.config.js");
const javascriptReactJestConfig = require("./scripts/eslint/javascript-react-jest.config.js");

const typescriptConfig = require("./scripts/eslint/typescript.config.js");
const typescriptJestConfig = require("./scripts/eslint/typescript-jest.config.js");
const typescriptReactConfig = require("./scripts/eslint/typescript-react.config.js");
const typescriptReactJestConfig = require("./scripts/eslint/typescript-react-jest.config.js");

module.exports = {
  root: true,
  settings: {
    "import/resolver": "node"
  },
  overrides: [
    javascriptConfig,
    javascriptJestConfig,
    javascriptReactConfig,
    javascriptReactJestConfig,
    typescriptConfig,
    typescriptJestConfig,
    typescriptReactConfig,
    typescriptReactJestConfig
  ]
};
