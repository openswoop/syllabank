module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript"
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
        "project": "./client/tsconfig.json"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/explicit-function-return-type": ["error", {
            "allowTypedFunctionExpressions": true
        }],
        "@typescript-eslint/indent": "off",
        "indent": "off",
        "import/prefer-default-export": "off",
        "import/extensions": "off",
        "react/jsx-indent": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".jsx", ".tsx"] }],
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-props-no-spreading": [1, { "html": "ignore" }],
        "react/prop-types": ["off", { "extensions": ["*.tsx"] }]
    },
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    },
};