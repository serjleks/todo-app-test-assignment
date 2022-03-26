module.exports = (options) => {
  const { mode = "development", exclude = [] } = options;
  const isProd = mode === "production";

  return {
    module: {
      rules: [
        {
          test: /\.js(x?)$/,
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
                  ["@babel/preset-react"]
                ]
              }
            }
          ]
        }
      ]
    }
  };
};
