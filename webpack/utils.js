function getBoolean(value, defaultValue) {
  switch (value) {
    case true:
    case "true":
    case "yes":
    case "on":
      return true;
    case false:
    case "false":
    case "no":
    case "off":
      return false;
    default:
      return defaultValue;
  }
}

const findLoader = (loadersArray, loaderName) =>
  loadersArray.findIndex((rule) => rule.loader === loaderName);

const removeLoader = (loadersArray, loaderName) => {
  loadersArray.splice(findLoader(loadersArray, loaderName), 1);
};

module.exports = {
  getBoolean,
  findLoader,
  removeLoader
};
