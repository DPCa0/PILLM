 
class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
  }

  [Symbol.asyncIterator]() {
    let count = 0, a = 0, b = 1;
    return {
      next: () => new Promise(resolve => {
        setTimeout(() => {
          if (count++ >= this.limit) {
            resolve({ done: true });
          } else {
            [a, b] = [b, a + b];
            resolve({ value: a, done: false });
          }
        }, 100);
      })
    };
  }
}

const fibonacciProxyHandler = {
  get(target, property) {
    if (property === 'description') {
      return `A sequence of Fibonacci numbers up to limit ${target.limit}`;
    }
    return Reflect.get(target, property);
  }
};

const fibonacciProxy = new Proxy(new FibonacciSequence(10), fibonacciProxyHandler);

 
(async () => {
  print(fibonacciProxy.description);
  for await (let num of fibonacciProxy) {
    print(num);
  }
})();
