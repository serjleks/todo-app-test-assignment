const babelConfig = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        },
        modules: "auto",
        loose: true
      }
    ],
    ["@babel/preset-react"]
  ],
  plugins: [["explicit-exports-references"]]
};

module.exports = {
  transformer: "babel-jest",
  babelConfig
};
