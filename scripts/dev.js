// 针对具体的模块（package）打包
// 针对packages 目录下面所有模块（包）进行打包

const fs = require("fs");
const execa = require("execa"); // 开启子进程

// 筛选出所有目标文件夹
const target = "reactivity";

build(target);
// 调用rollup进行打包
async function build(target) {
  await execa(
    "rollup",
    [
      "-cw",
      "--environment", // 配置环境变量
      `TARGET:${target}`,
    ],
    {
      stdio: "inherit", // 当子进程打包的信息共享给父进程
    }
  );
}
