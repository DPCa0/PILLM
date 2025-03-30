 

class Fibonacci {
  constructor() {
    this.cache = new Map();
  }

   
  *generate(n) {
    let [a, b] = [0, 1];
    for (let i = 0; i < n; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

   
  async getFib(n) {
    if (this.cache.has(n)) {
      return this.cache.get(n);
    }
    const fibGen = this.generate(n + 1);
    let result;
    for (let i = 0; i <= n; i++) {
      result = fibGen.next().value;
    }
    this.cache.set(n, result);
    return result;
  }
}

const fibonacciProxy = new Proxy(new Fibonacci(), {
  get(target, prop) {
    if (prop === 'getFib') {
      return async function (n) {
        print(`Calculating Fibonacci of ${n}`);
        return await target.getFib(n);
      };
    }
    return target[prop];
  }
});

(async () => {
  try {
    const results = await Promise.all(
      [5, 10, 20, 30].map(n => fibonacciProxy.getFib(n))
    );
    print('Fibonacci Results:', results);
  } catch (error) {
    console.error('Error:', error);
  }
})();
