/** @type {import('jest').Config} */
const config = {
  reporters: [['github-actions', { silent: false }], 'summary'],
};

module.exports = config;
