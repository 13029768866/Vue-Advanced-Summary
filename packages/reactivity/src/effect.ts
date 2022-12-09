// 1、用户传递一个函数,这个函数立即执行
// 2、effect具有响应式(ReactiveEffect),依赖属性变化立即执行

export let activeEffect = undefined;
export class ReactiveEffect {
    // 默认把fn挂载到类的实例上
    constructor(private fn){}
    run(){
        console.log('this作用域', this);
        activeEffect = this;
        return this.fn()
    }
}
export function effect (fn) {
    const _effect = new ReactiveEffect(fn);
    console.log('effect~~',_effect);
    _effect.run();
}