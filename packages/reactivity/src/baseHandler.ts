import {extend, isObject} from '@vue/shared';
import {reactive, readonly} from "./reactive";


const get = createGetter();
const shallowget = createGetter(false, true);
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);

const set = createSetter();
const shallowSet = createSetter(true);


function createGetter(isReadonly = false, isShallow = false) {
    return function get(target, key, receiver) {
        let res = Reflect.get(target, key, receiver)
        if (!isReadonly) {
            // 进行依赖收集, 视图更新
        }
        if (isShallow) {
            return res;
        }
        if (isObject(res)) {
            // 懒代理
           return  isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    }
}

function createSetter( isShallow = false){
    return function set(target, key, value,receiver){
        return  Reflect.set(target, key, value,receiver)
    }
}

const readonlySet = {
    set: (target, key) => {
        console.warn(`Set operation on key "${key}" failed: target is readonly.`);
    }
}

export const mutableHandlers = {
    get,
    set
};
export const shallowReactiveHandlers = {
    get: shallowget,
    set: shallowSet
};
export const readonlyHandlers = extend({
    get: readonlyGet
}, readonlySet);
export const shallowReadonlyHandlers = extend({
    get: shallowReadonlyGet
},readonlySet);