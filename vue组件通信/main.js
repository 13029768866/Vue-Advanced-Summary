import Vue from 'vue'
import App from './App'

// 添加全局样式，指令，组件
// 向上触发组件方法
Vue.prototype.$dispatch = function (eventName,value) {
    let parent = this.$parent
    while(parent){
        parent.$emit(eventName,value)
        parent = parent.$parent
    }
}

// 向下查找方法
Vue.prototype.$broadcase = function (eventName, value) {
    let children = this.$children
    function broad(){
        children.forEach(child => {
            child.$emit(eventName,value)
            if(child.$children){
                broad(child.$children)
            }
        })
    }
    broad(children)
}


new Vue({
    el:'#app',
    // h是createElement简写
    render: h => h(App)
})