import path from "path";
import resolveNode from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import ts from "rollup-plugin-typescript2";
/* utils Fn */

// 获取每个包的package.json
const packagesDir = path.resolve(__dirname, "packages");
const packageDir = path.resolve(packagesDir, process.env.TARGET);
const resolve = (file) => path.resolve(packageDir, file);
const pkg = require(resolve("package")); // json可以直接引入
// console.log("rollup---wzj", pkg);
const pkgOptions = pkg.buildOptions || {};
const name = pkgOptions.filename || path.basename(packageDir);

// 打包类型映射表，根据formats格式化
const outputConfigs = {
  "esm-bundle": {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: "es",
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: "cjs",
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: "iife",
  },
};

// 根据format和映射创建rollup配置项
function createConfig(format, outputConig) {
  //   console.log("build", format, outputConig);
  outputConig.name = pkgOptions.name;
  outputConig.sourcemap = true; // 生成sourcemap

  // rollup配置
  return {
    input: resolve(`src/index.ts`),
    output: outputConig,
    plugins: [
      json(),
      ts({
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
      }),
      resolveNode(),
    ],
  };
}

// rollup最终需要导出配置
export default pkgOptions.formats.map((format) =>
  createConfig(format, outputConfigs[format])
);
