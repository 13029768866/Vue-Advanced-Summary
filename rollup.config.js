import path from 'path';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-typescript2';

// 找到全部包文件夹--packages
const packagesDir = path.resolve(__dirname,'packages')
// 通过执行传递的TARGET,找到对应文件夹
const packageDir = path.resolve(packagesDir,process.env.TARGET)
// 找到包自己的package.json
const resolve = ( p ) => path.resolve(packageDir,p)
const pkg =  require(resolve('package.json'))

// 文件名字
const name = path.basename(packageDir)

// 打包类型映射表，根据formats格式化
const outputConfig = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: `es`
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: `cjs`
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: `iife`
  },
}

const options = pkg.buildOptions


/**
 * 创建打包配置
 * @param format
 * @param output
 */
function createConfig(format, output){
  output.name = options.name;
  // output.sourcemap = true;
  // 生成rollup配置
  return {
    input: resolve('src/index.ts'),
    output,
    plugins: [ // 注意：先解析ts，再解析第三方
      json(),
      ts({
        tsconfig: path.resolve(__dirname,'tsconfig.json')  // 告诉ts使用哪个规则文件
      }),
      nodeResolve(),
    ]
  }
}

export default options.formats.map(format => createConfig(format, outputConfig[format]))

