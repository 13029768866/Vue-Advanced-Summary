import { initState } from "./observe"

function Vue(options){
  // 参数统一初始化
  this._init(options)
}

Vue.prototype._init = function(options){
  let vm = this
  vm.$options = options

  initState(vm)
}


export default Vue