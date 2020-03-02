import Observer from "./observer"




export function initState(vm){
  let opts = vm.$options
  if(opts.data){ 
    initData(vm)
  }
}
// 数据劫持
export function observe(data){
  if(typeof data !== 'object' || data === null) return

  return new Observer(data)
}
// 代理数据
function proxy(vm,source,key){
  Object.defineProperty(vm,key,{
    get(){
      return vm[source][key]
    },
    set(newValue){
      vm[source][key] = newValue
    }
  })
}
// 初始化数据
function initData(vm){
  let data = vm.$options.data
  // 需要用vm._data代理一下
  data = vm._data = typeof data === "function"?data.call(vm) : data || {}
  
  // 用vm._data代理vm.data数据
  for(let key in data){
    proxy(vm,'_data',key)
  }
  observe(vm._data)
}

// 初始化计算属性
function initComputed(){

}

// 初始化观察者
function initWatch(){

}