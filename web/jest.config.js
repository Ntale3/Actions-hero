/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/server.js"
  ],
  coverageReporters: ["text", "lcov"],
  verbose: true
};
