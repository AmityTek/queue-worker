require('dotenv').config({ path: '.env.test' });

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  forceExit: true,
  testTimeout: 20000
};
