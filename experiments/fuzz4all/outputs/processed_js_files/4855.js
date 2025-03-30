class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function* asyncGenerator(array) {
  for (const item of array) {
    yield await new Promise(resolve => setTimeout(() => resolve(item), 100));
  }
}

function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
}

const complexCalculation = memoize((x) => {
  print(`Calculating for ${x}`);
  return x * x;
});

(async () => {
  const deferred = new Deferred();

   
  setTimeout(() => deferred.resolve('Async operation completed'), 500);

  for await (const value of asyncGenerator([1, 2, 3])) {
    print(`Generated: ${value}`);
  }

  print('Awaiting deferred result...');
  const deferredResult = await deferred.promise;
  print(deferredResult);

   
  const obj = { a: 1, b: 2 };
  const proxy = new Proxy(obj, {
    get(target, prop) {
      print(`Accessing ${prop}`);
      return target[prop];
    }
  });

  print(`a: ${proxy.a}, b: ${proxy.b}`);

   
  const privateData = new WeakMap();
  class Secret {
    constructor(secret) {
      privateData.set(this, { secret });
    }
    reveal() {
      return privateData.get(this).secret;
    }
  }

  const secretInstance = new Secret('Top Secret');
  print(`Revealed: ${secretInstance.reveal()}`);

  print('Calculations with memoization:');
  print(complexCalculation(5));
  print(complexCalculation(5));  
})();
