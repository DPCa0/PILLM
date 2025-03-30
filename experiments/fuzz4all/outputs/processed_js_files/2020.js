 
const handler = {
  get: (target, prop, receiver) => {
    print(`Property ${prop} was accessed.`);
    return Reflect.get(...arguments);
  },
  set: (target, prop, value) => {
    print(`Property ${prop} was set to ${value}.`);
    return Reflect.set(...arguments);
  }
};

 
const target = { foo: 42 };

 
const proxy = new Proxy(target, handler);

 
let { foo } = proxy;
proxy.bar = { ...proxy, foo: 100 };

 
class Example {
  #privateField = "Private";
  
  logPrivate() {
    print(this.#privateField);
  }

  static async *asyncGenerator() {
    yield 'Hello';
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield 'World';
  }
}

 
const example = new Example();
example.logPrivate();

 
print(proxy?.baz?.qux ?? 'Default Value');

 
(async () => {
  for await (const word of Example.asyncGenerator()) {
    print(word);
  }
})();
