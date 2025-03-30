 

async function* asyncGenerator() {
  let i = 0;
  while (i < 5) {
    yield new Promise(resolve => setTimeout(() => resolve(i++), 1000));
  }
}

const handler = {
  get(target, property, receiver) {
    const value = Reflect.get(target, property, receiver);
    if (typeof value === 'function') {
      return function(...args) {
        print(`Calling method: ${property}`);
        return Reflect.apply(value, target, args);
      };
    }
    return value;
  }
};

const asyncIterableProxy = new Proxy({
  [Symbol.asyncIterator]: asyncGenerator
}, handler);

(async function() {
  for await (const num of asyncIterableProxy) {
    print(num);  
  }
})();
