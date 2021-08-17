const fs = require('fs');
const execa = require('execa')


// 获取目标文件(筛选出packags下面所有文件夹)
const targets = fs.readdirSync('packages').filter(f => {
  if( !fs.statSync(`packages/${f}`).isDirectory()){
    return false
  }
  return true
})

async function build(target){
 await execa("rollup", [
    "-c",
    "--environment",
    `TARGET:${target}`
  ],
   {
     stdio: "inherit"  // 子进程信息共享给父进程
   })
}

/**
 * 并行打包
 * @param targets 目标文件
 * @param iteratorFn   对应打包方法
 */
function runParallerl(targets, iteratorFn){
  const res = []
  for(const item of targets){
    const p = iteratorFn(item)
    res.push(p)
  }
  return Promise.all(res)
}

runParallerl(targets,build)
