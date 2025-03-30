class FibonacciSequence {
  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    for (;;) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }
}

const memoize = (fn) => {
  const cache = new Map();
  return (key) => {
    if (cache.has(key)) {
      print(`Fetching from cache: ${key}`);
      return cache.get(key);
    }
    const result = fn(key);
    print(`Calculating result for: ${key}`);
    cache.set(key, result);
    return result;
  };
};

const calculateFibonacci = memoize((n) => {
  let sequence = Array.from(new FibonacciSequence());
  return sequence[n];
});

const asyncFibonacci = async (n) => {
  print(`Start calculating Fibonacci(${n})`);
  return new Promise((resolve) => setTimeout(() => resolve(calculateFibonacci(n)), 1000));
};

(async () => {
  const numbers = [10, 20, 30, 10, 20, 5];
  for (const num of numbers) {
    print(`Fibonacci(${num}) = ${await asyncFibonacci(num)}`);
  }
})();
