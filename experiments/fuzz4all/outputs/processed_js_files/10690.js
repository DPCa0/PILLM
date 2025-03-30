class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  calculate(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    let result = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const asyncFibonacci = async (limit) => {
  const fibonacci = new Fibonacci(limit);
  const fibArray = Array.from(fibonacci);

  const delayedSum = async (arr) => {
    const promises = arr.map(num => new Promise(resolve => {
      setTimeout(() => resolve(num), Math.random() * 100);
    }));
    const results = await Promise.all(promises);
    return results.reduce((acc, num) => acc + num, 0);
  };

  const sum = await delayedSum(fibArray);
  print(`Sum of first ${limit} Fibonacci numbers:`, sum);
};

(async () => {
  const limit = 10;
  await asyncFibonacci(limit);
})();
