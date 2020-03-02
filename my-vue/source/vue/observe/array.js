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

methods.forEach(method => {
  vueArrayProto[method] = function(...args){    
    // console.log('vue数组方法执行')
    return arrayProto[method].apply(this,args)
    
  }
})