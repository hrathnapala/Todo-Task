module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(axios)/)', // 👈 transform axios ESM
    ],
    moduleNameMapper: {
      '\\.(css|less|scss)$': 'identity-obj-proxy'
    }
  };
  