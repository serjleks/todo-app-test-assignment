module.exports = (options) => {
  const {
    mode = "development",
    exclude = [],
    outputDir = "images",
    optm = false
  } = options;
  const isProd = mode === "production";

  return {
    module: {
      rules: [
        {
          test: /\.(ico|jpg|jpeg|png|gif)(\?.*)?$/,
          exclude,
          type: "asset/resource",
          generator: {
            filename: isProd
              ? `${outputDir}/[contenthash:8][ext]`
              : `${outputDir}/[name]_[hash:8][ext]`
          },
          use: [
            {
              loader: "image-webpack-loader",
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: false,
                  optimizationLevel: 7
                },
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                }
              }
            }
          ]
        },
        {
          test: /\.(svg)(\?.*)?$/,
          exclude,
          type: optm ? "asset/inline" : "asset/resource",
          generator: !optm
            ? {
              filename: isProd
                ? `${outputDir}/[contenthash:8][ext]`
                : `${outputDir}/[name]_[hash:8][ext]`
            }
            : {},
          parser: {
            dataUrlCondition: {
              maxSize: 2 * 1024 // 2kb
            }
          },
          use: [
            {
              loader: "image-webpack-loader",
              options: {
                svgo: {
                  removeDoctype: false,
                  removeComments: true,
                  removeViewBox: false,
                  removeUselessStrokeAndFill: false,
                  removeEmptyAttrs: false,
                  convertColors: {
                    names2hex: true,
                    rgb2hex: true
                  }
                }
              }
            }
          ]
        }
      ]
    }
  };
};
