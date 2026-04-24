/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts',
  ],
  coverageThreshold: {
    global: {
      lines: 70,
      functions: 70,
      branches: 60,
    }
  },
  setupFiles: ['./src/__tests__/setup.ts'],
};
