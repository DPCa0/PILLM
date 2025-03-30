class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
    this[Symbol.iterator] = function* () {
      let a = 0, b = 1, n = 0;
      while (n < this.limit) {
        yield a;
        [a, b] = [b, a + b];
        n++;
      }
    };
  }
}

const asyncOperation = (value) => 
  new Promise((resolve) => setTimeout(() => resolve(value * value), 100));

(async function processFibonacci() {
  const fib = new FibonacciSequence(10);
  
  const results = await Promise.all([...fib].map(async num => {
    const squared = await asyncOperation(num);
    return { num, squared };
  }));
  
  print(results);
})();

 
const handler = {
  get: function(target, prop) {
    print(`Accessing property '${prop}'`);
    return target[prop];
  }
};

const target = { message: "Hello, Proxy!" };
const proxy = new Proxy(target, handler);

print(proxy.message);
