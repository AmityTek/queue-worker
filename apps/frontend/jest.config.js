const nextJest = require('next/jest');
require('dotenv').config({ path: '.env.test' });

const createJestConfig = nextJest({
  dir: './',
});


const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './jest.babel.config.js' }],
  },
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|svg|gif)$': '<rootDir>/__mocks__/fileMock.js',
  },
};

module.exports = createJestConfig(customJestConfig);
