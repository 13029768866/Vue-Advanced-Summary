import {initState} from './observe'

function Vue(options){
  // 初始化vue,传入用户配置项
  this._init(options);
}

Vue.prototype._init = function(options){
  let vm = this;
  vm.$options = options

  // MVVM原理 需要初始化数据
  initState(vm);
}


export default Vue