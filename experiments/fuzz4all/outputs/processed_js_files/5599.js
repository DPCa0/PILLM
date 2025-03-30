 
const asyncIterable = {
  [Symbol.asyncIterator]: async function* () {
    const values = [1, 2, 3, 4, 5];
    for (let value of values) {
      yield new Promise(resolve => setTimeout(() => resolve(value * 2), 1000));
    }
  }
};

const proxyHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return Reflect.get(target, prop);
    } else {
      print(`Property ${prop} does not exist`);
      return undefined;
    }
  }
};

(async () => {
  const proxy = new Proxy(asyncIterable, proxyHandler);
  for await (const value of proxy) {
    print(value);  
  }
})();
