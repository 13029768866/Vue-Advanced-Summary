let id = 0;
class Dep{
  constructor(){
    this.id = id++;
    this.subs = []
  }
  // 订阅
  addSub(watcher){
    this.subs.push(watcher)
  }
  notify(){
    this.subs.forEach(watcher => watcher.update())
  }
}

let dep = new Dep()
dep.add