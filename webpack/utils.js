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

module.exports = {
  getBoolean
};
