module.exports = (options) => {
  const { mode = "development", outputDir = "fonts", exclude = [] } = options;
  const isProd = mode === "production";

  return {
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
          exclude,
          type: "asset/resource",
          generator: {
            filename: isProd
              ? `${outputDir}/[contenthash:8][ext]`
              : `${outputDir}/[name]_[hash:8][ext]`
          }
        }
      ]
    }
  };
};
