import Observe from './observer'



export function initState(vm){
  let opts = vm.$options
  if(opts.data){
    initData(vm)
  }
  if(opts.computed){
    initComputed()
  }
  if(opts.watch){
    initWatch()
  }
}

// 数据劫持
export function observe(data){
// 类型检测
  if(typeof data !== 'object' || data == null){
    return
  }

  return new Observe(data)
}

// 初始化数据
function initData(vm){
  let data = vm.$options.data
  // 判断是否是函数，是函数改变this指向到vm实例
  data = vm._data = typeof data === 'function'?data.call(vm) : data || {}

  observe(vm._data)
}
// 初始化计算属性
function initComputed(){

}
// 初始化观察者
function initWatch(){

}