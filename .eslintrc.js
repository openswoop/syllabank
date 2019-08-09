module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "@typescript-eslint/explicit-function-return-type": ["error", {
            "allowTypedFunctionExpressions": true
        }],
        "@typescript-eslint/indent": "off",
        "indent": "off",
        "react/jsx-indent": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".jsx", ".tsx"] }],
        "react/jsx-one-expression-per-line": "off",
    }
};