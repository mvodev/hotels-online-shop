/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  resetMocks: false,
  setupFiles: ["jest-localstorage-mock"],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|svg|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/styleMock.js',
  },
};