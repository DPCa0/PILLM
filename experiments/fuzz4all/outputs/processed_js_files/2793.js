class Fibonacci {
  constructor() {
    this.memo = new Proxy({}, {
      get: (target, name) => name in target ? target[name] : this.calculate(name)
    });
  }

  calculate(n) {
    if (n <= 1) return n;
    this.memo[n] = this.memo[n - 1] + this.memo[n - 2];
    return this.memo[n];
  }

  *[Symbol.iterator]() {
    let i = 0;
    while (true) {
      yield this.memo[i++];
    }
  }
}

async function fetchNumber() {
  const response = await fetch('https://api.math.tools/numbers/fibonacci?limit=1');
  const data = await response.json();
  return data[0];
}

(async () => {
  const fibonacci = new Fibonacci();
  const fetchedNumber = await fetchNumber();

  for (const [index, value] of fibonacci.entries()) {
    if (index > fetchedNumber) break;
    print(`F(${index}) = ${value}`);
  }
})();
