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
    ["@babel/preset-react"],
    ["@babel/preset-typescript"]
  ],
  plugins: [["explicit-exports-references"]]
};

module.exports = {
  transformer: "ts-jest",
  babelConfig
};
