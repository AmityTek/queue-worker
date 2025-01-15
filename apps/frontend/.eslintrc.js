module.exports = {
  extends: ["@repo/eslint-config/next.js"],
  rules: {
    "no-console": ["error", { allow: ["warn", "error", "log"] }],
    "unicorn/filename-case": "off",
    "react/hook-use-state": "off"
  },
};
