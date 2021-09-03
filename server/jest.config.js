module.exports = {
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  setupFilesAfterEnv: ['./tests/setupEnv.js'],
};
