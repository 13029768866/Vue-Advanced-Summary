import { observe } from "./index"

// 获取老数组原型
let arrayProto = Array.prototype

export let vueArrayProto = Object.create(arrayProto)


let methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'splice'
]
// 数组新增项添加数据劫持
export function observeArray(add){
  for(let i= 0; i<add.length; i++){
    observe(add[i])
  }
}

methods.forEach(method => {
  vueArrayProto[method] = function(...args){    
    // console.log('vue数组方法执行')
    let add;
    switch(method){
      case 'push':
      case 'unshift':
        temp = args
        break;
      case 'splice':
        temp = args.slice(2)
        break;
      default:
        break;
    }
    if(add) observeArray(add)
    return arrayProto[method].apply(this,args)
    
  }
})