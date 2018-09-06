const path = require('path');
const webpack = require('webpack');
const config = require('../config')

module.exports = {
  entry: {
    app: ['babel-polyfill', '../src/main.js'],
    vendor: ['vue/dist/vue.esm.js', 'vue-router', 'axios', 'vuex'] // 需要打包起来的依赖
  },
  output: {
    path: path.join(__dirname, '../static/js'), // 输出的路径
    filename: '[name].dll.js', // 输出的文件，将会根据entry命名为vendor.dll.js
    library: '[name]_library' // 暴露出的全局变量名
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor"]
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-mainfest.json'), // 描述依赖对应关系的json文件
      name: '[name]_library',
      context: __dirname // 执行的上下文环境，对之后DllReferencePlugin有用
    }),
    new webpack.optimize.UglifyJsPlugin({ // uglifjs压缩
      minimize: true,
      sourceMap: config.build.productionSourceMap,
      parallel: true,
      uglify: true,
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true
      }
    })
  ]
}
