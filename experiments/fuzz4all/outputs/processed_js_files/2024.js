class FibonacciGenerator {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  *generate(limit) {
    let [a, b] = [0, 1];
    for (let i = 0; i < limit; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  nth(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    const result = this.nth(n - 1) + this.nth(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

(async () => {
  const fetchNumber = async () => {
    return new Promise(resolve => setTimeout(() => resolve(10), 1000));
  };

  const fibGenerator = new FibonacciGenerator();
  const number = await fetchNumber();

  print(`Generating first ${number} Fibonacci numbers:`);
  for (let num of fibGenerator.generate(number)) {
    print(num);
  }

  print(`The ${number}th Fibonacci number is: ${fibGenerator.nth(number)}`);
})();
