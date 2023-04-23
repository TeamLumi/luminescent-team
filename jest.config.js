/** @type {import('jest').Config} */
const config = {
  reporters: ['default', ['jest-junit', { outputDirectory: 'reports', outputName: 'report.xml' }]],
};

module.exports = config;
