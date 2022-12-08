// 1、对象代理 => 解决方法proxy
// 2、多次代理
// - 1、同一个对象代理多次 => 解决办法: WeakMap
// - 2、代理过后对象再次代理 =>  解决办法: 添加标识Flag
import { isObject } from "@vue/shared";

// 所有标识枚举
export const enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive' // 是否代理标识
}

const proxyMap =  new WeakMap();

export function reactive (target) {
    // 因为new Proxy的target只接收对象,reactive只处理对象数据类型
    if( !isObject(target)) return target;

    // 检查target是否代理过
    const existingProxy = proxyMap.get(target);
    if(existingProxy) return existingProxy;

    // 检查target是否有代理标识
    if(target[ReactiveFlags.IS_REACTIVE]) return target;


    // 使用new Proxy代理对象
    const proxy = new Proxy(target, {
        get(target, key, receiver) {
            if(key === ReactiveFlags.IS_REACTIVE) return true;
            return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver){
            return Reflect.set(target, key, value, receiver)
        }
    });

    // 未代理添加代理
    proxyMap.set(target, proxy)
    return proxy;
}