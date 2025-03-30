class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

 
function traceMethodCalls(obj) {
  return new Proxy(obj, {
    get(target, propKey) {
      const originalMethod = target[propKey];
      return function (...args) {
        print(`Method ${propKey} was called with args: ${JSON.stringify(args)}`);
        return originalMethod.apply(this, args);
      };
    }
  });
}

 
class AsyncGeneratorExample {
  async *[Symbol.asyncIterator]() {
    for (let i = 1; i <= 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));  
      yield i;
    }
  }
}

 
(async () => {
  const asyncGenInstance = new AsyncGeneratorExample();

   
  const tracedInstance = traceMethodCalls(asyncGenInstance);

  for await (let value of tracedInstance) {
    print(`Yielded value: ${value}`);
  }

   
  const deferred = new Deferred();
  deferred.promise.then(console.log).catch(console.error);
  deferred.resolve('Operation completed!');
})();
