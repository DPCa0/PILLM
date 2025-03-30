class FibonacciSequence {
  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    while (true) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
}

const fibonacci = new FibonacciSequence();

const getNthFibonacci = (n) => {
  const fibGenerator = fibonacci[Symbol.iterator]();
  return Array.from({ length: n }, () => fibGenerator.next().value).pop();
};

const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const memoizedFibonacci = memoize(getNthFibonacci);

print(memoizedFibonacci(10));  
print(memoizedFibonacci(50));  
