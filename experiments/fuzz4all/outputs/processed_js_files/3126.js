class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function* asyncGenerator(arr) {
  for (let item of arr) {
     
    await new Promise(resolve => setTimeout(resolve, 100));
    yield item * 2;
  }
}

(async function main() {
  const array = [1, 2, 3, 4, 5];
  const def = new Deferred();

  setTimeout(() => {
    print("Resolving deferred promise after 500ms");
    def.resolve("Deferred promise resolved!");
  }, 500);

  for await (const num of asyncGenerator(array)) {
    print(`Processed number: ${num}`);
  }

  const result = await def.promise;
  print(result);

  const map = new Map();
  const weakMap = new WeakMap();
  const obj = {};

  map.set('key1', 'value1');
  weakMap.set(obj, 'value2');

  print(`Map value for 'key1': ${map.get('key1')}`);
  print(`WeakMap value for object: ${weakMap.get(obj)}`);

  const proxy = new Proxy(array, {
    get(target, prop) {
      if (prop === 'length') {
        print('Accessed length property');
        return target[prop];
      }
      return Reflect.get(target, prop);
    }
  });

  print(`Proxy length: ${proxy.length}`);

  const asyncIterator = array[Symbol.asyncIterator] = asyncGenerator.bind(null, array);
  
  for await (const val of asyncIterator()) {
    print(`Async iterator value: ${val}`);
  }
})();
