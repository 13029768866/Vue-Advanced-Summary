const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口文件
  entry: './src/index',
  // 打包出口文件
  output:{
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist')
  },
  // 打包产生源码方便观察
  devtool: 'source-map',
  // 设置模块解析顺序
  resolve:{
    modules:[
      path.resolve(__dirname,'source'),
      path.resolve(__dirname,"node_modules")
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'public/index.html')
    })
  ]

}