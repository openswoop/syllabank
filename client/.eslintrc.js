module.exports = {
  "extends": [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  ignorePatterns: [
    ".eslintrc.js",
    "*.config.js",
  ],
  "rules": {
    "no-param-reassign": "off", // for redux-toolkit
    "import/prefer-default-export": "off",
    "react/jsx-props-no-spreading": [1, { "html": "ignore" }],
    "react/prop-types": ["off", { "extensions": ["*.tsx"] }]
  },
};