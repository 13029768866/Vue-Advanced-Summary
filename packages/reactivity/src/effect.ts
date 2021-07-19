export function effect(fn, options: any = {}) {
  // 响应式，数据变化重新执行
  const effect = createReactiveEffect(fn, options);

  if (!options.lazy) {
    effect(); //  默认先触发执行一次
  }

  return effect;
}

let uid = 0;
let activeEffect; // 存储当前的effect
const effectStack = []; // 解决effect嵌套问题
function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    // 保证effect没有加入effecStack中，防止死循环
    if (!effectStack.includes(effect)) {
      try {
        effectStack.push(effect);
        activeEffect = effect;
        fn(); // fn取值是走get method
      } finally {
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];
      }
    }
  };

  effect.id = uid++; // 制作effect标识，目的:区分和排序
  effect._isEffect = true; // _字段私有的，不向外接暴露，这个标识区分是否响应式
  effect.raw = fn; // 保存初始函数
  effect.options = options; // 保存初始用户options
  return effect;
}

const targetMap = new WeakMap();
export function track(target, type, key) {
  //   activeEffect;
  //   对象属性对应多个effect
  if (!activeEffect) return;

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
  }

  console.log(targetMap);
}
