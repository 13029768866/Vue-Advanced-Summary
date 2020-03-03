import { observe } from './index'
import { vueArrayProto,observeArray } from './array'

export function defineReactive(data,key,value){
  observe(value)
  Object.defineProperty(data,key,{
    get(){
      return value
    },
    set(newValue){
      if(newValue === value) return
      observe(newValue)
      value = newValue
    }
  })
}

class Observer{
  constructor(data){
   if(Array.isArray(data)){
    data.__proto__ = vueArrayProto
    observeArray(data)
   }else{
    this.walk(data)
   }
  }
  walk(data){
    let keys = Object.keys(data)
    for(let i = 0; i< keys.length; i++){
      let key = keys[i],
          value = data[key]
      defineReactive(data,key,value)
    }
  }
}

export default Observer