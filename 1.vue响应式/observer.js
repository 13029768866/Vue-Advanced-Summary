// view层
function render() {
    console.log('模拟视图更新')
}

// model层
let data = {
    name: 'wzj',
    info: {
        age: 18
    },
    arr: [1,2,3]
}
// 类型检查
function checkType(obj){
    return Object.prototype.toString
            .call(obj)
            .slice(8,-1)
            .toLocaleLowerCase()
}

// 重写数组原型方法
let arrProto = Array.prototype
let newArrProto = Object.create(arrProto)

let arrMethods = ['push','unshift','splice']
arrMethods.forEach(method => {
    newArrProto[method] = function(...arg){       
        arrProto[method].call(this,...arg)
        render()
    }
})
// 观察者
function observer(obj) {
    // 数据类型判断
    // 非null的对象类型
    if(checkType(obj) === 'object' && obj !== null){
        for(let key in obj){
            defineReactive(obj, key, obj[key])
        }
    }
    // 数组类型
    if(Array.isArray(obj)){
        // 问题4解决:修改对象的原型方法
        Object.setPrototypeOf(obj,newArrProto)
        for(let i in obj.length){
             observer(obj[i])
        }
    }
}

// 数据劫持
function defineReactive(obj, key, val){
    // 问题2、递归解决数据默认劫持第一层
    observer(val)
    Object.defineProperty(obj, key, {
        get(){
            return val
        },
        set(newVal){
            if(val !== newVal){
                val = newVal
                // 3、问题3解决方案
                observer(newVal)
                render()
            }
        }
    })
}

observer(data)
// 1、基础功能实现
// data.name = 'wzj加油'

// 问题区域
/* 
2、数据默认劫持第一层
*/
// data.info.age = 25

/* 
3、对象数据重新赋值时,数据劫持丢失
*/
/* data.info = {
    age: 25
}
data.info.age = 30 */

/* 
4、不支持数组
特殊注意:数组当中对象是支持响应式的
非对象不支持响应式
*/
data.arr.push({sex:'男'})
