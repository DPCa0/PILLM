class AsyncGenerator {
  constructor(max) {
    this.max = max;
    this.current = 0;
  }

  async *[Symbol.asyncIterator]() {
    while (this.current < this.max) {
      yield await this.fetchData(this.current++);
    }
  }

  fetchData(n) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(`Data ${n}`), Math.random() * 1000);
    });
  }
}

(async () => {
  const asyncGen = new AsyncGenerator(5);
  
  for await (const data of asyncGen) {
    print(data);
  }
})();

const proxyHandler = {
  get: function(target, prop) {
    if (prop in target) {
      return target[prop];
    }
    console.warn(`Property "${prop}" is not defined.`);
    return 42;  
  }
};

const originalObject = { name: "Alice", age: 30 };
const proxy = new Proxy(originalObject, proxyHandler);

print(proxy.name);  
print(proxy.age);  
print(proxy.unknown);  

const map = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
]);

const mapProxy = new Proxy(map, {
  get(target, prop, receiver) {
    if (typeof prop === 'string' && !target.has(prop)) {
      target.set(prop, `default for ${prop}`);
    }
    return Reflect.get(target, prop, receiver);
  }
});

print(mapProxy.get("key1"));  
print(mapProxy.get("key3"));  
