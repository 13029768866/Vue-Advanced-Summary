// packages/shared/src/index.ts
var isObject = (value) => {
  return value !== null && typeof value === "object";
};

// packages/reactivity/src/reactive.ts
var ReactiveFlags = /* @__PURE__ */ ((ReactiveFlags2) => {
  ReactiveFlags2["IS_REACTIVE"] = "__v_isReactive";
  return ReactiveFlags2;
})(ReactiveFlags || {});
var proxyMap = /* @__PURE__ */ new WeakMap();
function reactive(target) {
  if (!isObject(target))
    return target;
  const existingProxy = proxyMap.get(target);
  if (existingProxy)
    return existingProxy;
  if (target["__v_isReactive" /* IS_REACTIVE */])
    return target;
  const proxy = new Proxy(target, {
    get(target2, key, receiver) {
      if (key === "__v_isReactive" /* IS_REACTIVE */)
        return true;
      return Reflect.get(target2, key, receiver);
    },
    set(target2, key, value, receiver) {
      return Reflect.set(target2, key, value, receiver);
    }
  });
  proxyMap.set(target, proxy);
  return proxy;
}

// packages/reactivity/src/effect.ts
var activeEffect = void 0;
var ReactiveEffect = class {
  constructor(fn) {
    this.fn = fn;
  }
  run() {
    console.log("this\u4F5C\u7528\u57DF", this);
    activeEffect = this;
    return this.fn();
  }
};
function effect(fn) {
  const _effect = new ReactiveEffect(fn);
  console.log("effect~~", _effect);
  _effect.run();
}
export {
  ReactiveEffect,
  ReactiveFlags,
  activeEffect,
  effect,
  reactive
};
//# sourceMappingURL=reactivity.js.map
