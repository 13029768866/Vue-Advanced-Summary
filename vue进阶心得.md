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