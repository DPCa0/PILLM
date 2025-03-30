class FibonacciSequence {
  constructor() {
    this.memo = new Map();
  }

   
  fibonacci(n, a = 0, b = 1) {
    if (n === 0) return a;
    if (n === 1) return b;

    if (this.memo.has(n)) return this.memo.get(n);

    let result = this.fibonacci(n - 1, b, a + b);
    this.memo.set(n, result);
    return result;
  }
}

(async () => {
   
  const fibonacciModule = await import('./fibonacciModule.js');

  const seq = new FibonacciSequence();
  print(`Fibonacci(10): ${seq.fibonacci(10)}`);

   
  const promises = [
    fetch('https://jsonplaceholder.typicode.com/posts/1'),
    fetch('https://jsonplaceholder.typicode.com/posts/2'),
    Promise.reject('Intentional Error')
  ];

  const results = await Promise.allSettled(promises);
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      print('Fulfilled:', result.value);
    } else {
      print('Rejected:', result.reason);
    }
  });

   
  const target = { a: 1, b: 2 };
  const handler = {
    get(obj, prop) {
      print(`Getting property '${prop}'`);
      return obj[prop];
    },
    set(obj, prop, value) {
      print(`Setting property '${prop}' to '${value}'`);
      obj[prop] = value;
      return true;
    }
  };

  const proxy = new Proxy(target, handler);
  print(proxy.a);
  proxy.b = 42;
  print(proxy.b);

   
  function* customSequence() {
    let i = 0;
    while (i < 3) {
      yield i++;
    }
  }

  for (const value of customSequence()) {
    print('Generated value:', value);
  }
})();
