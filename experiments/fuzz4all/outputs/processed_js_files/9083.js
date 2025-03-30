class FibonacciSequence {
  constructor(max) {
    this.max = max;
    this.memo = new Map();
  }

  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    while (curr <= this.max) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  get(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    let result = this.get(n - 1) + this.get(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const sequence = new FibonacciSequence(100);

const asyncMap = async (iterator, fn) => {
  const result = [];
  for (const value of iterator) {
    result.push(await fn(value));
  }
  return result;
};

(async () => {
  const squaredFibs = await asyncMap(sequence, async (num) => {
    await new Promise(resolve => setTimeout(resolve, 100));  
    return num * num;
  });

  print(squaredFibs);
})();
