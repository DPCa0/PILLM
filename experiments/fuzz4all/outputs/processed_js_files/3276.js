 
class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  *sequence(limit) {
    let [a, b] = [0, 1];
    for (let i = 0; i < limit; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  calculate(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    const value = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, value);
    return value;
  }

  async delayedCalculate(n, delay) {
    const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
    await timeout(delay);
    return this.calculate(n);
  }
}

(async () => {
  const fib = new Fibonacci();
  const limit = 10;
  const sequence = Array.from(fib.sequence(limit));
  print(`Fibonacci sequence (first ${limit} numbers):`, sequence);

  const number = 20;
  const delayedValue = await fib.delayedCalculate(number, 1000);
  print(`Fibonacci number at position ${number}:`, delayedValue);
})();

 
const handler = {
  get: (target, property, receiver) => {
    print(`Property '${property}' accessed`);
    return Reflect.get(...arguments);
  }
};

const user = new Proxy({ name: "Alice", age: 30 }, handler);
print(user.name);
print(user.age);

 
const uniqueId = Symbol('id');
const ids = new Set();
ids.add(uniqueId);
ids.add(Symbol('id'));  

print(`Unique IDs count: ${ids.size}`);
