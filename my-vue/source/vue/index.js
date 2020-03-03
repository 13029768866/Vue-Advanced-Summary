import { initState } from "./observe"
import Watcher from "./observe/watcher"

function Vue(options){
  // 参数统一初始化
  this._init(options)
}

Vue.prototype._init = function(options){
  let vm = this
  vm.$options = options

  initState(vm)

  // 视图初始化
 if(vm.$options.el){
   vm.$mount()
 }
}
// 公共方法
const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g
const util = {
  compilerText(node,vm){ //编译文本，替换{{}}
    node.textContent = node.textContext.replace(defaultRE,function(...args){
      console.log(args)
    }) 
  }
}
// 渲染页面，组件挂载
function query(el){
  if(typeof el === 'string'){
    return document.querySelector(el)
  }
  return el;
}
function compiler(node,vm){
  let childNodes = node.children;
  [...childNodes].forEach( child=> {
    if(child.nodeType === 1){

    }else if(child.nodeType === 3){
      Uint8ClampedArray.compilerText(child)
    }
  });
}
Vue.prototype._update = function(){
  // 用户传入的数据 更新视图
  let vm = this
  let el = vm.$el
  
  // 循环元素,匹配{{}}的方式
  // 创建文档碎片
  let node = document.createDocumentFragment()
  let firstChild;
  while(firstChild = el.firstChild){
    node.appendChild(firstChild)
  }
  el.appendChild(node)
  console.log(el)
}

Vue.prototype.$mount = function (){
  let vm = this;
  let el = vm.$options.el;
  el= vm.$el = query(el)
 
  // 渲染时通过watcher来渲染的
  let updateComponent = () =>{ // 更新组件，渲染逻辑
    // console.log('执行')
    vm._update()
  }
  // 渲染watcher
  new Watcher(vm,updateComponent)
}
 
export default Vue