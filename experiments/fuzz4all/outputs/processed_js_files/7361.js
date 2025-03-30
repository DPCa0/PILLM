class FibonacciSequence {
  constructor() {
    this.memo = new Proxy({}, {
      get: (target, name) => name in target ? target[name] : (target[name] = this.calculate(name))
    });
  }

  calculate(n) {
    if (n < 2) return n;
    return this.memo[n - 1] + this.memo[n - 2];
  }
  
  *generate(n) {
    for (let i = 0; i < n; i++) {
      yield this.memo[i];
    }
  }
}

(async () => {
  const fib = new FibonacciSequence();
  const asyncGenerator = async function* (generator) {
    for (let value of generator) {
      yield await new Promise(resolve => setTimeout(() => resolve(value), 100));
    }
  };
  
  for await (let num of asyncGenerator(fib.generate(10))) {
    print(num);
  }
})();
