module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended"
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "react", "react-hooks", "prettier"],
    env: {
        es6: true,
        node: true,
        jest: true
    },
    settings: {
        react: {
            version: "detect"
        }
    },
    rules: {
        "prettier/prettier": ["error", { singleQuote: true, semi: false }],
        "react/react-in-jsx-scope": "off"
    }
}