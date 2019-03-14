'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '*':{
        changeOrigin: true,
        // target: 'http://localhost:90', // 118 环境
        // target: 'http://localhost:70', // 118 环境
        // target: 'http://192.168.30.120:8080/mockjs', // rap
        // target: 'http://192.168.30.80:7030',   //费余波
        // target: 'http://192.168.30.14:7030',   //向昌学
        // target: 'http://192.168.30.120:8080/mockjs/50', // rap
        // target: 'http://192.168.30.80:7030',   //费余波
        target: 'http://192.168.30.14:7030',   //向昌学
        // target: 'http://192.168.30.79:7030', // 徐炜
        // target: 'http://192.168.30.15:7777',   //陈博
        // target: 'http://192.168.30.18:7030',   //刘全全
        // target: 'http://118.31.39.65:7030',   // 测试环境
        // target: 'http://118.31.39.65:7030',   // 测试环境
        // target: 'http://47.98.237.36:7030',   // 测试环境 新
        // target: 'http://118.31.39.65:7030',   // 测试环境
        // target: 'http://192.168.30.64:3000',   // 本地node
        // target: 'http://192.168.30.17:7030', // 毛世桥``````
        // target : 'http://hzapi.arbexpress.cn' , // 正式环境
        // target: 'http://192.168.30.16:7030',//徐悦科
      },
    },

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
