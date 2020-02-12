## 指令

### 1、$nexkTick

DOM操作时延迟执行：$nextTick ,并且DOM操作是异步的，存在缓存区，为了性能会在多次操作后统一执行。

### 2、$mount

挂载时使用，单元测试，在内存中挂载vue实例时用到

### 3、template

1、占位标签，不可以添加key属性，key属性只能给真实的元素添加，（key版本2.5+必须添加，为了性能优化domdiff）

2、v-show不支持template

### 4、v-model

：value 和 @input 的语法糖

### 5、自定义指令directive

1、参数el,bindings,vnode

2、类似指令的声明周期，bind,inserted,updated

3、this指向window

## computed 和 watch使用场景

1、computed基于Object.defineProperty存在缓存，methods不存在缓存

2、computed 处理基于data的简单事件，比如计算一个值的结果，只能处理同步。

3、watch处理复杂数据变化，比如监听变化需要调用接口。

## vue动画

常见触发操作：v-if v-show v-for 路由切换

css添加动画： animation , transition

js动画：自带钩子  velocity

个数：单个动画，多个动画

一般设置v-enter, v-leave-to, v-enter-active,v-leave,active

使用animate动画库

```js
<transition
      enter-active-class="bounceIn"
      leave-active-class ="bounceOut"
    >
        <div 
          class="box animated"
          v-show="isShow"
        >
          content
      </div>
    </transition>
```

多组动画使用v-if

```js
<input type="text" v-model="filter">
     
    <!-- 多组动画 -->
    <transition-group
      enter-active-class = "bounceIn"
      leave-active-class = "bounceOut"
    >
      <div 
        class="box animate"
        v-for="item in computedDataList"
        :key ="item.title"
        v-if="isShow"
      >
        {{item.title}}
      </div>
    </transition-group>
```

## 组件的应用

### 生命周期

### 组件类型

数据来源：自身data，外界props

1、全局组件

2、局部组件

3、函数式组件

4、异步组件

### 组件通信

#### $attrs

接受所有没被使用的传参

```
绑定属性 v-bind="$attrs"

inheritAttrs:false // 不在dom上显示传递的属性
```

#### $listeners 和 $emit

```js
绑定事件 v-on= "$listeners"
1、修饰符native，相当于原生的给模板的最外层元素添加事件
<my-button @click.native="show"></my-button>

2、子组件调用父组件的方法$listeners
template: `<div><button v-on=$listeners>点我呀</button></div>`

3、$emit向上派发（发布订阅）
template: `<div><button @click="$emit('click')">点我呀</button></div>`
```

