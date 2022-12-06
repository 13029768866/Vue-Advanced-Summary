// packages/shared/src/index.ts
var isObject = (value) => {
  return value !== null && typeof value === "object";
};

// packages/reactivity/src/index.ts
console.log(isObject({ a: 1 }));
//# sourceMappingURL=reactivity.js.map
