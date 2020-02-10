// 渲染函数
function render(){
    console.log('模拟视图渲染')
}

// 模拟响应式数据
let obj = {
    name: 'wzj',
    son: {
        name: 'wzj666'
    },
    arr: [1,2,3]    
}

// 观察者
function observer(obj){
    // 先判断数据类型
    // 数组
    if(Array.isArray(obj)){

    }
    // 不是null的对象
    if(typeof obj === 'object' && obj !== null){
        // 给对象的所有属性添加get和set
        for(let key in obj){
            defineReactive(obj, key, obj[key])
        }
    }
}

// 数据劫持
function defineReactive(obj, attr, value){
    // 2、递归解决深层对象数据劫持问题
    observer(value)
    Object.defineProperty(obj, attr, {
        get(){
            return value
        },
        set(newVal){     
            // 3、解决对象重新赋值的数据劫持问题     
            observer(newVal)      
            if(value === newVal) return                                
            value = newVal
            render()
        }
    })
}

// 属性添加
function $set(obj,attr,value){
    defineReactive(obj,attr,value)
    render()
}

observer(obj)
/* 1、数据变化视图渲染(基础版本)
obj.name = 'wzj好帅' */

/* 2、深层对象嵌套的数据劫持
obj.son.name = 'wzj真帅' */

/* 3、对象属性重新赋值的数据劫持
obj.son = {
    name: 'wzj牛逼'
}
obj.son.name ='wzj真帅' */

/* 
4、给对象添加属性
obj.a = 'wzj真帅'

1) $set方法  $set(obj,'a','wzj真帅')
2）重新赋值对象
*/

/* 
5、数组的特殊处理
*/
