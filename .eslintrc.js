module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
        node: true
    },
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jest/recommended",
        "plugin:react/recommended"
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: "module"
    },
    plugins: [
        "@typescript-eslint",
        "jest",
        "react"
    ],
    rules: {
        "comma-dangle": [ "error", "always-multiline" ],
        "quotes": [ "error", "double" ],
        "semi": [ "error", "always" ],
    },
};
