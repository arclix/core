module.exports = {
    plugins: ["@typescript-eslint"],
    parser: "@typescript-eslint/parser",
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parserOptions: {
        sourceType: "module",
        ecmaVersion: "2022",
    },
    rules: {
        "no-debugger": ["error"],
        "no-empty": ["warn", { allowEmptyCatch: true }],
        "no-process-exit": "off",
        "no-useless-escape": "off",
        "prefer-const": [
            "warn",
            {
                destructuring: "all",
            },
        ],
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-extra-semi": "off", // conflicts with prettier
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-var-requires": "off",
    },
};
