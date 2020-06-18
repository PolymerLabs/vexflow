const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = config => {
  config.set(
    merge(createDefaultConfig(config), {
      files: [
        { pattern: config.grep ? config.grep : 'wc-test/**/*.test.js', type: 'module' },
      ],

      browserNoActivityTimeout: 120000,
      browserDisconnectTimeout: 120000,

      frameworks: ['esm'],

      esm: {
        nodeResolve: true,
      },
    }),
  );
  return config;
};