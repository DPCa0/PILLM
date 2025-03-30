class FibonacciSequence {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  calculate(n) {
    if (this.memo.has(n)) {
      return this.memo.get(n);
    }
    const result = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, result);
    return result;
  }

  *[Symbol.iterator]() {
    let i = 0;
    while (true) {
      yield this.calculate(i++);
    }
  }
}

const sequence = new FibonacciSequence();
const firstTenFibNumbers = Array.from(sequence).slice(0, 10);
print(firstTenFibNumbers);

const asyncProcess = async () => {
  const numbers = [1, 2, 3, 4, 5];
  const double = (num) => new Promise((resolve) => setTimeout(() => resolve(num * 2), 100));
  const results = await Promise.all(numbers.map(double));
  print(results);
};

asyncProcess();
