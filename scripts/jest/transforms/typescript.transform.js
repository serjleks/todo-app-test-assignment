const { createTransformer } = require("ts-jest");

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
    ["@babel/preset-react"],
    ["@babel/preset-typescript"]
  ],
  plugins: [["explicit-exports-references"]]
};

module.exports = createTransformer({
  babelConfig
});
