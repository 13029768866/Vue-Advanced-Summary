var VueReactivity = (function (exports) {
  'use strict';

  const isObject = (val) => typeof val === "object" && val !== null;
  const extend = Object.assign;

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
  const mutableHandlers = {
      get,
      set,
  };
  const shallowReactiveHandlers = {
      get: shallowGet,
      set: shallowSet,
  };
  const readonlyHandlers = extend({
      get: readonlyGet,
  }, readonlyObj);
  const shallowReadonlyHandlers = extend({
      get: shallowReadonlyGet,
  }, readonlyObj);
  function createGetter(isReadonly = false, isShallow = false) {
      return function get(target, key, receiver) {
          //  proxy + reflect 模式
          const res = Reflect.get(target, key, receiver);
          if (isShallow)
              return res;
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
          return res;
      };
  }

  function reactive(target) {
      return createReactiveObject(target, false, mutableHandlers);
  }
  function shallowReactive(target) {
      return createReactiveObject(target, false, shallowReactiveHandlers);
  }
  function readonly(target) {
      return createReactiveObject(target, true, readonlyHandlers);
  }
  function shallowReadonly(target) {
      return createReactiveObject(target, true, shallowReadonlyHandlers);
  }
  /* 创建代理Map */
  const reactiveMap = new WeakMap();
  const readonlyMap = new WeakMap();
  /* 添加响应式 */
  function createReactiveObject(target, isReadonly, baseHandler) {
      /* 1、判断是否是对象 */
      if (!isObject(target))
          return target;
      /* 2、根据isReadonly确定代理Map */
      const proxyMap = isReadonly ? reactiveMap : readonlyMap;
      /* 3、判断是否代理过 */
      const existProxy = proxyMap.get(target);
      if (existProxy)
          return existProxy;
      const proxy = new Proxy(target, baseHandler);
      proxyMap.set(target, proxy);
      return proxy;
  }

  exports.reactive = reactive;
  exports.readonly = readonly;
  exports.shallowReactive = shallowReactive;
  exports.shallowReadonly = shallowReadonly;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
//# sourceMappingURL=reactivity.global.js.map
