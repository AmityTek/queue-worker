import { defineConfig } from "eslint-define-config";

export default defineConfig({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  ignorePatterns: ["node_modules/", "dist/"], 
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "react/jsx-sort-props": "warn",
    "react/no-array-index-key": "warn"
  },
  settings: {
    react: {
      version: "detect",
    },
  },
});
