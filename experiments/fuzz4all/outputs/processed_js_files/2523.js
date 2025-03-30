class FibonacciGenerator {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map();
  }
  
  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      yield curr;
      [prev, curr] = [curr, this.memo.get(i) ?? curr + prev];
      this.memo.set(i, curr);
    }
  }
}

const asyncCompute = async (gen) => {
  const results = [];
  for await (const num of gen) {
    results.push(num);
  }
  return results;
};

(async () => {
  const fibGen = new FibonacciGenerator(10);
  const fibonacciSequence = await asyncCompute(fibGen);
  const enhancedSequence = fibonacciSequence.map(n => n * n);
  
  const results = await Promise.all(enhancedSequence.map(async (num) => {
    await new Promise(resolve => setTimeout(resolve, 100));  
    return num;
  }));
  
  print(`Squared Fibonacci Sequence: ${results.join(', ')}`);
})();
