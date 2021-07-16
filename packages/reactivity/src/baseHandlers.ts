import { extend, isObject } from "@vue/shared";
import { track } from "./effect";
import { TrackOptionsTypes } from "./operators";
import { reactive, readonly } from "./reactive";

const get = createGetter();
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);

const set = createSetter();
const shallowSet = createSetter();

const readonlyObj = {
  set: (target, key) => {
    console.log(`set on key ${key} failed`);
  },
};

export const mutableHandlers = {
  get,
  set,
};
export const shallowReactiveHandlers = {
  get: shallowGet,
  set: shallowSet,
};
export const readonlyHandlers = extend(
  {
    get: readonlyGet,
  },
  readonlyObj
);
export const shallowReadonlyHandlers = extend(
  {
    get: shallowReadonlyGet,
  },
  readonlyObj
);

function createGetter(isReadonly = false, isShallow = false) {
  return function get(target, key, receiver) {
    //  proxy + reflect 模式
    const res = Reflect.get(target, key, receiver);
    if (!isReadonly) {
      // 进行Dep收集，数据变化后更新视图
      track(target, TrackOptionsTypes.GET, key);
    }
    if (isShallow) return res;
    // 懒代理
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res);
    }
    return res;
  };
}

function createSetter(isShallow = false) {
  return function set(target, key, value, receiver) {
    const res = Reflect.set(target, key, value, receiver);
    // 数据更新时，通知对应属性的effect重新执行

    return res;
  };
}
