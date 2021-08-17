# Vue3初体验

## 一、区别介绍

### 1、宏观

1. 源码`monorepo`方式进行管理，将模块拆分到package目录中
2. `ts`开发，增强类型检测
3. 直接`tree-shaking`，不使用就不会打包，较少包体体积
4. 引入RFC，提案社区讨论后采纳[RFCS](https://github.com/vuejs/vue)

### 2、代码

1. `Vue3`数据劫持Proxy，`vue2`采用defineProerty。
2. 模板编译进行了优化，生成Block tree,可以对子节点的动态节点进行收集，减少比较，采用`patchFlag`标记动态节点
3. `compositionApi`，解决反复横跳，优化服用逻辑，相比较`optionsApi`类型推断更加方便
4. 增加了`Fragment`,`Teleport`,`Suspense`组件

## 二、架构分析

### 1、项目结构

- **reactivity: 响应式系统**
- **runtime-core: 与平台无关的运行时核心**
- **runtime-dom: 针对浏览器运行时，包括`DOM API`，属性，事件处理等**
- rumtime-test: 测试
- server-render: 服务端渲染
- **compiler-core: 与平台无关的编译河西**
- **compiler-dom: 针对浏览器的编译模块**
- compiler-ssr: 针对服务端渲染的编译模块
- **compiler-sfc: 针对单文件解析**
- size-check: 测试代码体积
- template-explorer: 调试编译器输出的开发工具
- shared：多个包之间的共享内容
- vue：完整版本

### 2、依赖

|            依赖             |                        |
| :-------------------------: | :--------------------: |
|         typescript          |         支持TS         |
|           rollup            |        打包工具        |
|  rollup-plugin-typescript2  |     rollup和TS桥梁     |
| @rollup/plugin-node-resolve |   node第三方模块解析   |
|     @rollup/plugin-json     |      支持引入json      |
|            execa            | 开启子进程方便执行命令 |

```bash
 yarn add typescript rollup rollup-plugin-typescript2 @rollup/plugin-node-resolve @rollup/plugin-json execa --ignore-workspace-root-check
```

 **--ignore-workspace-root-check** 作用是给根模块安装依赖

## 三、初始化

### 1、pkg

1. `module` webpack打包入口
2. `buildOptions` 自定义打包配置项
3. `sripts` 配置脚本，`dev`单个模块打包，`build`全局模块打包

