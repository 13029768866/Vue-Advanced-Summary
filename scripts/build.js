// 针对packages 目录下面所有模块（包）进行打包

const fs = require("fs");
const execa = require("execa"); // 开启子进程

// 筛选出所有目标文件夹
const targets = fs.readdirSync("packages").filter((file) => {
  if (!fs.statSync(`packages/${file}`).isDirectory()) return false;
  return true;
});

// 调用rollup进行打包
async function build(target) {
  await execa(
    "rollup",
    [
      "-c",
      "--environment", // 配置环境变量
      `TARGET:${target}`,
    ],
    {
      stdio: "inherit", // 当子进程打包的信息共享给父进程
    }
  );
}

// 对所有包一次进行打包,并行操作
function runParallel(targets, iteratorFn) {
  const res = [];
  for (const item of targets) {
    const p = iteratorFn(item);
    res.push(p);
  }
  return Promise.all(res);
}

runParallel(targets, build);
