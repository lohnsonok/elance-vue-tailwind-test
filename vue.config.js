/**
 * These are some necessary steps changing the default webpack config of the Vue CLI
 * that need to be changed in order for TypeScript based components to generate their
 * declaration (.d.ts) files.
 * Code by various users from https://github.com/vuejs/vue-cli/issues/1081
 */

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add(/src/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // modify the options...
        return options;
      }
      );
  }
};
