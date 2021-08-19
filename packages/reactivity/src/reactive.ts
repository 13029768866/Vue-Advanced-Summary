import { isObject } from '@vue/shared'
const mutableHandlers = {};
const shallowReactiveHandlers = {};
const readonlyHandlers = {};
const shallowReadonlyHandlers = {};

export function reactive(target){
    return createReactiveObject(target, false, mutableHandlers);
}

export function shallowReactive(target){
    return createReactiveObject(target, false, shallowReactiveHandlers);
}

export function readonly(target){
    return createReactiveObject(target, true, readonlyHandlers);
}

export function shallowReadonly(target){
    return createReactiveObject(target, true, shallowReadonlyHandlers);
}

// WeakMap的key是对象,弱引用，会自动垃圾回收,不会造成内存泄漏
const reactiviveMap = new WeakMap();
const readonlyMap = new WeakMap();

// 4个方法，都是创建响应式，类型不同,运用科里化
/**
 *
 * @param target        需要添加响应式的对象
 * @param isReadonly    是否只读
 * @param baseHandler   对应的处理器，添加getter，setter
 * @return 代理后的对象
 */
export function createReactiveObject(target, isReadonly, baseHandler){
    // Proxy用于创建一个对象的代理, 不是对象就没法拦截了
    if(isObject(target)){
        return target;
    }
    // 根据是否只读创建代理映射缓存
    const proxyMap = isReadonly? readonlyMap: reactiviveMap;

    // 防止重复代理
    const existProxy = proxyMap.get(target);
    if(existProxy){
        return existProxy;
    }

    const proxy = new Proxy(target, baseHandler);
    proxyMap.set(target, proxy);

    return proxy;
}