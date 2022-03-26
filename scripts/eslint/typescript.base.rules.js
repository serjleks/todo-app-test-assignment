module.exports = {
  "prettier/prettier": [
    "error",
    {
      endOfLine: "auto"
    }
  ],
  "indent": [
    "error",
    2,
    {
      SwitchCase: 1,
      flatTernaryExpressions: false,
      offsetTernaryExpressions: false
    }
  ],
  "import/no-extraneous-dependencies": "off",
  "import/prefer-default-export": "off",
  "import/namespace": "off",
  "import/no-namespace": "off",
  "import/named": "off",
  "import/extensions": "off",
  "no-console": "off",
  "lines-between-class-members": [
    "error",
    "always",
    {
      exceptAfterSingleLine: true
    }
  ],
  "@typescript-eslint/no-namespace": "off",
  "@typescript-eslint/naming-convention": [
    "error",
    {
      selector: "variableLike",
      format: ["camelCase", "PascalCase", "UPPER_CASE"]
    }
  ]
};
