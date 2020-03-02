import Observer from "./observer"




export function initState(vm){
  let opts = vm.$options
  if(opts.data){ 
    initData(vm)
  }

}
// 数据劫持
function observe(data){
  if(typeof data !== 'object' || data === null) return

  return new Observer(data)
}

// 初始化数据
function initData(vm){
  let data = vm.$options.data
  // 需要用vm._data代理一下
  data = vm._data = typeof data === "function"?data.call(vm) : data || {}
  
  observe(vm._data)
}

// 初始化计算属性
function initComputed(){

}

// 初始化观察者
function initWatch(){

}