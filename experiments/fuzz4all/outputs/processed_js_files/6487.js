class Fibonacci {
  constructor() {
    this.memo = new Proxy({}, {
      get: (target, prop) => prop in target ? target[prop] : this.calculate(prop)
    });
  }

  calculate(n) {
    if (n <= 1) return n;
    const value = this.memo[n - 1] + this.memo[n - 2];
    this.memo[n] = value;  
    return value;
  }

  * [Symbol.iterator]() {
    let i = 0;
    while (true) {
      yield this.memo[i++];
    }
  }
}

const fib = new Fibonacci();
const fibIterator = fib[Symbol.iterator]();

print("First 10 Fibonacci Numbers:");
for (const num of fibIterator) {
  if (num > 55) break;  
  print(num);
}

(async function() {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  print("\nAsync Fibonacci Sequence with Delay:");
  for await (const num of fibIterator) {
    if (num > 89) break;  
    print(num);
    await delay(1000);  
  }
})();
