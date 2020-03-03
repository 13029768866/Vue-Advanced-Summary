let id = 0;
//  每次产生watcher都要有唯一的标识
class Watcher{
  constructor(vm,exprOrFn,cb = ()=>{},opts = {}){
    this.vm = vm
    this.exprOrFn =exprOrFn
    if(typeof exprOrFn === 'function'){
      this.getter = exprOrFn;  // getter就是new Watcher传入的第二个函数
    }
    this.cb = cb
    this.opts = opts
    this.id = id++

    this.get()
  }
  get(){
    this.getter()
  }
}

export default Watcher