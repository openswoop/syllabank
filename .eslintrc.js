module.exports = {
  "extends": [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
  ],
  "parserOptions": {
    "project": "./client/tsconfig.json"
  },
  "rules": {
    "no-param-reassign": "off",
    "implicit-arrow-linebreak": "off",
    "import/prefer-default-export": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-spreading": [1, { "html": "ignore" }],
    "react/prop-types": ["off", { "extensions": ["*.tsx"] }]
  },
};