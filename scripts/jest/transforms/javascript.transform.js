const { createTransformer } = require("babel-jest");

const babelConfig = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
          esmodules: false
        },
        modules: "auto",
        loose: true
      }
    ],
    ["@babel/preset-react"]
  ],
  plugins: [["explicit-exports-references"]]
};

module.exports = createTransformer(babelConfig);
