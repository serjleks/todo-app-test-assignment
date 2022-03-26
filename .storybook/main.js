const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    {
      name: "@storybook/preset-scss",
      options: {
        cssLoaderOptions: {
          sourceMap: false,
          modules: {
            exportLocalsConvention: "camelCase"
          }
        },
        sassLoaderOptions: {
          sassOptions: {
            includePaths: [path.resolve(__dirname, "../../src")]
          }
        }
      }
    },
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: "@storybook/react"
};
