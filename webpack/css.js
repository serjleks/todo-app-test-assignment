const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// PostCSS plugins
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

// Utils
const { removeLoader } = require("./utils");

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

  const loaders = {
    module: {
      rules: [
        {
          test: /\.(css)$/,
          include: /\.module\.css$/,
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
            }
          ]
        },
        {
          test: /\.(css)$/,
          exclude: [...exclude, /\.module\.css$/],
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: "css-loader",
              options: {
                sourceMap: srcmap,
                modules: false
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
            }
          ]
        }
      ]
    },
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
  };

  if (!optm) {
    removeLoader(loaders.module.rules[0].use, "postcss-loader");
    removeLoader(loaders.module.rules[1].use, "postcss-loader");
  }

  return loaders;
};
