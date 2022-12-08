let person = {
  name: "wzj",
  get nickName() {
    return `${this.name}===WoodensRanger`;
  },
};

let proxyPerson = new Proxy(person, {
  get(target, key, receiver) {
    console.log("取值操作代理==", key);
    // 这种方式this指向person,并不是proxyPerson
    // return target[key];

    return Reflect.get(target, key, receiver);
  },
});

proxyPerson.nickName;
