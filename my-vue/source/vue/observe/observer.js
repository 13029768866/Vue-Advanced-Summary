export function defineReactive(data,key,value){
  Object.defineProperty(data,key,{
    get(){
      return value
    },
    set(newValue){
      if(newValue === value) return
      value = newValue
    }
  })
}

class Observer{
  constructor(data){
   this.walk(data)
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