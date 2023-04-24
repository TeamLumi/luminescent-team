/** @type {import('jest').Config} */
const config = {
  reporters: [
    ['github-actions', { silent: false }],
    ['jest-junit', { outputDirectory: 'reports', outputName: 'jest-report.xml' }],
    'summary',
  ],
};

module.exports = config;
