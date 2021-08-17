import { isObject } from "@vue/shared";
import {
  mutableHandlers,
  shallowReactiveHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from "./baseHandlers";
export function reactive(target) {
  return createReactiveObject(target, false, mutableHandlers);
}

export function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers);
}

export function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers);
}

export function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers);
}
/* 创建代理Map */
const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();

/* 添加响应式 */
function createReactiveObject(target, isReadonly, baseHandler) {
  /* 1、判断是否是对象 */
  if (!isObject(target)) return target;
  /* 2、根据isReadonly确定代理Map */
  const proxyMap = isReadonly ? reactiveMap : readonlyMap;
  /* 3、判断是否代理过 */
  const existProxy = proxyMap.get(target);
  if (existProxy) return existProxy;

  const proxy = new Proxy(target, baseHandler);
  proxyMap.set(target, proxy);
  return proxy;
}
