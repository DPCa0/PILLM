class FibonacciSequence {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  get(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    let val = this.get(n - 1) + this.get(n - 2);
    this.memo.set(n, val);
    return val;
  }
}

const fibonacciProxyHandler = {
  get(target, property) {
    if (typeof property === 'symbol' || isNaN(property)) {
      return target[property];
    }
    const index = parseInt(property);
    return target.get(index);
  }
};

const fibonacciSequence = new Proxy(new FibonacciSequence(), fibonacciProxyHandler);

async function printFibonacciAsync(n) {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(fibonacciSequence[n]), 1000);
  });
  const result = await promise;
  print(`Fibonacci number at position ${n} is: ${result}`);
}

 
(async () => {
  const numbers = [10, 15, 20];
  const promises = numbers.map(n => printFibonacciAsync(n));
  await Promise.all(promises);
})();
