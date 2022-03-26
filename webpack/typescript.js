module.exports = (options) => {
  const {
    mode = "development",
    exclude = [],
    srcmap = true,
    forktsc = false
  } = options;
  const isProd = mode === "production";

  return {
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: !isProd,
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      modules: false,
                      loose: true
                    }
                  ],
                  ["@babel/preset-react"],
                  [
                    "@babel/preset-typescript",
                    {
                      onlyRemoveTypeImports: forktsc
                    }
                  ]
                ]
              }
            },
            {
              loader: "ts-loader",
              options: {
                transpileOnly: forktsc,
                compilerOptions: {
                  sourceMap: srcmap
                }
              }
            }
          ]
        }
      ]
    }
  };
};
