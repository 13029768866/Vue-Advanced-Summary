const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // 入口文件
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist')
  },
  // 可以产生源代码
  devtool: 'source-map',
  // 更改解析模块的查找方式
  resolve: {
    modules: [path.resolve(__dirname,'source'),path.resolve('node_modules')]
  },
  plugins: [    
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname,'public/index.html')
      })    
  ]
}