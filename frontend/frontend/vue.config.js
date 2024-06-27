const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://34.81.219.139:5000',
  //       changeOrigin: true,
  //       pathRewrite: { '^/api': '' },
  //     },
  //   },
  // },
});
