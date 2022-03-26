const typescriptConfig = require("./tsconfig.json");
const javascriptTransformer = require("./scripts/jest/transforms/javascript.transform.js");
const typescriptTransformer = require("./scripts/jest/transforms/typescript.transform.js");

module.exports = {
  displayName: {
    name: "todo-app-test-assignment",
    color: "blue"
  },

  rootDir: "./",
  roots: ["<rootDir>", "<rootDir>/src"],

  verbose: true,
  automock: false,

  testEnvironment: "jsdom",
  globals: {
    "NODE_ENV": "test",
    "ts-jest": {
      tsconfig: typescriptConfig.compilerOptions,
      babelConfig: typescriptTransformer.babelConfig
    },
    "babel-jest": {
      babelConfig: javascriptTransformer.babelConfig
    }
  },

  testMatch: [
    "**/(__tests__|__test__|__specs__|__spec__)/**/?(*.)+(spec|specs|test|tests).{ts,tsx,js,jsx}"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/.yarn/",
    "/build/",
    "/storybook/",
    "/docs/",
    "/bin/"
  ],

  setupFiles: ["<rootDir>/scripts/jest/setupJest.js"],
  setupFilesAfterEnv: [
    "<rootDir>/scripts/jest/setupEnv.js",
    "<rootDir>/scripts/jest/setupMock.js"
  ],

  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],

  moduleNameMapper: {
    "\\.(css|sass|scss)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.(ts|tsx)?$": typescriptTransformer.transformer,
    "^.+\\.(js|jsx)?$": javascriptTransformer.transformer,
    "^.+\\.(ico|jpg|jpeg|png|gif|svg)$":
      "<rootDir>/scripts/jest/transforms/file.transform.js",
    "^.+\\.(woff|woff2|eot|ttf|otf)$":
      "<rootDir>/scripts/jest/transforms/file.transform.js"
  },
  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$"],

  snapshotSerializers: ["enzyme-to-json/serializer"],

  coverageDirectory: "<rootDir>/build/reports/tests/coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageReporters: ["json", "text", "lcov", "clover"],

  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
    [
      "jest-watch-suspend",
      {
        "key": "s",
        "suspend-on-start": true
      }
    ]
  ]
};
