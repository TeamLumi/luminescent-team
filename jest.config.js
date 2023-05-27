/** @type {import('jest').Config} */
const config = {
  reporters: ['default', ['jest-junit', { outputDirectory: 'reports', outputName: 'jest-report.xml' }]],
  testEnvironment: 'jsdom',
};

module.exports = config;
