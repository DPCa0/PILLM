class Fibonacci {
  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    while (true) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
}

const fibonacciSequence = new Fibonacci();
const fibArray = [...Array.from(fibonacciSequence).takeWhile(n => n < 1000)];

function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      print(`Fetching from cache for args: ${args}`);
      return cache.get(key);
    }
    print(`Calculating result for args: ${args}`);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const complexCalculation = memoize((n) => {
  return fibArray.reduce((acc, val) => acc + Math.sin(val + n), 0);
});

(async () => {
  print(await Promise.all([1, 2, 3, 4, 5].map(async num => complexCalculation(num))));
})();
