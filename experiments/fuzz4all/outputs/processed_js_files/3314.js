class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  calculate(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    const result = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, result);
    return result;
  }

  *generate(limit) {
    for (let i = 0; i < limit; i++) {
      yield this.calculate(i);
    }
  }
}

const fib = new Fibonacci();
const fibSequence = fib.generate(10);

const asyncDoubleFib = async function* (generator) {
  for await (let value of generator) {
    yield new Promise(resolve => setTimeout(() => resolve(value * 2), 100));
  }
};

(async () => {
  for await (let value of asyncDoubleFib(fibSequence)) {
    print(value);
  }
})();
