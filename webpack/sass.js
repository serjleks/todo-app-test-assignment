const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// PostCSS plugins
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = (options) => {
  const {
    mode = "development",
    exclude = [],
    extCss = true,
    outputDir = "css/",
    srcmap = true,
    optm = false
  } = options;

  const isProd = mode === "production";

  let loaders = {
    module: {
      rules: [
        {
          test: /\.(sass|scss)$/,
          exclude: [...exclude],
          use: [
            extCss
              ? { loader: MiniCssExtractPlugin.loader }
              : { loader: "style-loader" },
            {
              loader: "css-loader",
              options: {
                sourceMap: srcmap,
                modules: {
                  exportLocalsConvention: "camelCase",
                  localIdentName: isProd ? "[hash:base64:8]" : "[name]__[local]"
                }
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: srcmap,
                postcssOptions: {
                  plugins: [
                    autoprefixer(),
                    cssnano({
                      preset: [
                        "default",
                        {
                          discardComments: {
                            removeAll: true
                          }
                        }
                      ]
                    })
                  ]
                }
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: srcmap,
                sassOptions: {
                  includePaths: ["src"]
                }
              }
            }
          ]
        }
      ]
    }
  };

  // Remove postcss-loader
  if (!optm) {
    {
      const rules = loaders.module.rules[0].use;
      const index = rules.findIndex((k) => k.loader === "postcss-loader");
      rules.splice(index, 1);
    }
  }

  // External CSS
  if (extCss) {
    loaders = Object.assign(loaders, {
      plugins: [
        new MiniCssExtractPlugin({
          filename: isProd
            ? `${outputDir}/[contenthash:8].css`
            : `${outputDir}/[name].css`,
          chunkFilename: isProd
            ? `${outputDir}/[contenthash:8].css`
            : `${outputDir}/chunk-[name].css`
        })
      ]
    });
  }

  return loaders;
};
