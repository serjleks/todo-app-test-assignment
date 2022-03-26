module.exports = (options) => {
  const { exclude = [] } = options;

  return {
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
          exclude,
          type: "asset/resource"
        }
      ]
    }
  };
};
