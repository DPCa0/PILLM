class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function complexOperation() {
  const deferred = new Deferred();

   
  const handler = {
    get(target, prop, receiver) {
      if (typeof target[prop] === 'function') {
        return function (...args) {
          print(`Calling method: ${prop} with arguments: ${JSON.stringify(args)}`);
          return target[prop].apply(this, args);
        };
      }
      return Reflect.get(target, prop, receiver);
    }
  };

  const obj = new Proxy({
    compute: (x, y) => x * y,
    delayCompute: async (x, y, delay) => {
      await new Promise(resolve => setTimeout(resolve, delay));
      return x * y;
    }
  }, handler);

   
  const iteratorObj = {
    *[Symbol.iterator]() {
      for (let i = 0; i < 5; i++) {
        yield i;
      }
    }
  };

   
  (async () => {
    print("Result:", await obj.delayCompute(3, 5, 1000));
    deferred.resolve('Operation completed');
  })();

   
  for (const value of iteratorObj) {
    print(`Iterated value: ${value}`);
  }

  return deferred.promise;
}

complexOperation().then(console.log).catch(console.error);
