const path = require("path");
const { merge } = require("webpack-merge");

// Plugins
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

// Loaders
const convict = require("convict");
const yamlParser = require("js-yaml");
const typescript = require("./webpack/typescript.js");
const javascript = require("./webpack/javascript.js");
const sass = require("./webpack/sass.js");
const css = require("./webpack/css.js");
const images = require("./webpack/images.js");
const fonts = require("./webpack/fonts.js");

// Utilities
const utils = require("./webpack/utils");

// Environments
const MODE = process.env.NODE_ENV || "development";
const ASSETS_PATH = process.env.ASSETS_PATH || "/";

// Convict parsers
convict.addParser({
  extension: ["yml", "yaml"],
  parse: yamlParser.load
});

module.exports = (env) => {
  const isProd = MODE === "production";

  const config = convict({});

  const options = {
    optm: utils.getBoolean(env.optm, isProd),
    hot: utils.getBoolean(env.hot, false),
    extcss: utils.getBoolean(env.extcss, true),
    split: utils.getBoolean(env.split, true),
    srcmap: utils.getBoolean(env.srcmap, !isProd),
    forktsc: utils.getBoolean(env.forktsc, !isProd),
    report: utils.getBoolean(env.report, false),
    cache: utils.getBoolean(env.cache, !isProd)
  };

  config.loadFile(path.resolve(__dirname, "build.config.yml"));

  const exclude = [
    path.resolve(__dirname, "../node_modules"),
    path.resolve(__dirname, "../build")
  ];

  return merge([
    {
      name: config.get("name"),
      target: "web",
      context: path.resolve(__dirname),

      mode: MODE,

      entry: {
        [config.get("name")]: [path.join(__dirname, config.get("entry"))]
      },

      output: {
        path: path.join(__dirname, config.get("output.path")),
        filename: !isProd
          ? `${config.get("output.js.path")}/[name].js`
          : options.hot
            ? `${config.get("output.js.path")}/[hash].js`
            : `${config.get("output.js.path")}/[contenthash:8].js`,
        chunkFilename: !isProd
          ? `${config.get("output.js.path")}/chunk-[name].js`
          : `${config.get("output.js.path")}/[contenthash:8].js`,
        publicPath: ASSETS_PATH
      },

      devtool: options.srcmap
        ? options.hot
          ? "inline-source-map"
          : "source-map"
        : false,

      resolve: {
        symlinks: true,
        extensions: [".tsx", ".ts", ".jsx", ".js"],
        modules: [
          path.join(__dirname, "node_modules/"),
          path.join(__dirname, "src/"),
          path.join(__dirname, "./")
        ]
      },

      optimization: {
        emitOnErrors: options.hot
      },

      performance: {
        hints: false
      }
    },

    javascript({
      mode: MODE,
      exclude
    }),

    typescript({
      mode: MODE,
      exclude,
      srcmap: options.srcmap,
      forktsc: options.forktsc
    }),

    sass({
      mode: MODE,
      exclude,
      extCss: options.extcss,
      outputDir: config.get("output.css.path"),
      srcmap: options.srcmap,
      optm: options.optm
    }),

    css({
      mode: MODE,
      exclude,
      extCss: options.extcss,
      outputDir: config.get("output.css.path"),
      srcmap: options.srcmap,
      optm: options.optm
    }),

    images({
      mode: MODE,
      exclude,
      outputDir: config.get("output.images.path"),
      optm: options.optm
    }),

    fonts({ exclude }),

    // HTML
    {
      plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, "./resources/templates/index.html")
        })
      ]
    },

    // Favicons
    !options.hot
      ? {
        plugins: [
          new FaviconsWebpackPlugin({
            logo: config.get("assets.icons.iconPath"),
            mode: "webapp",
            cache: true,
            outputPath: path.join(
              __dirname,
              config.get("output.path"),
              config.get("assets.icons.output.path")
            ),
            prefix: "icons/",
            inject: true,
            favicons: {
              appName: "ToDo App",
              appDescription: "Todo App - Test assignment"
            }
          })
        ]
      }
      : {},

    // Enable dev-server
    {
      devServer: {
        static: config.get("output.path"),
        hot: true
      }
    },

    // Webpack filesystem cache
    options.cache
      ? {
        cache: {
          type: "filesystem",
          buildDependencies: {
            config: [__filename]
          }
        }
      }
      : {},

    // Typescript checker
    options.forktsc
      ? {
        plugins: [new ForkTsCheckerWebpackPlugin()]
      }
      : {},

    // Optimization
    options.optm
      ? {
        optimization: {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              parallel: true,
              extractComments: false,
              terserOptions: {
                compress: {
                  drop_console: false,
                  unsafe: false
                },
                format: {
                  comments: false
                }
              }
            })
          ]
        }
      }
      : {},

    // Split chunks
    isProd
      ? {
        optimization: {
          splitChunks: {
            chunks: "all",
            minSize: 40000,
            maxSize: 80000,
            cacheGroups: {
              defaultVendors: {
                name: "vendors",
                chunks: "initial",
                priority: 1,
                test: /[\\/]node_modules[\\/]/,
                minSize: 80000,
                maxSize: 120000
              }
            }
          }
        }
      }
      : {
        optimization: {
          splitChunks: {
            chunks: "all",
            cacheGroups: {
              defaultVendors: {
                name: "vendors",
                chunks: "initial",
                priority: 1,
                test: /[\\/]node_modules[\\/]/
              }
            }
          }
        }
      },

    // Bundle analyzer
    options.report
      ? {
        plugins: [
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false,
            reportFilename: path.join(
              __dirname,
              config.get("output.path"),
              config.get("report.path")
            )
          })
        ]
      }
      : {}
  ]);
};
