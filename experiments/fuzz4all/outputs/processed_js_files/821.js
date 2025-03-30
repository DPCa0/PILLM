class Fibonacci {
  *generate(n) {
    let a = 0, b = 1;
    for (let i = 0; i < n; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
}

const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      print(`Fetching from cache: ${key}`);
      return cache.get(key);
    }
    print(`Calculating result for: ${key}`);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const fibonacciSeries = new Fibonacci();
const fibSequence = [...fibonacciSeries.generate(10)];

const asyncSum = async (a, b) => a + b;

const sum = async (...numbers) => {
  return numbers.reduce(async (prevPromise, curr) => {
    const sumSoFar = await prevPromise;
    return asyncSum(sumSoFar, curr);
  }, Promise.resolve(0));
};

const memSum = memoize(sum);

(async () => {
  print('Fibonacci Series:', fibSequence);
  const total1 = await memSum(...fibSequence);
  print('Total Sum:', total1);
  const total2 = await memSum(...fibSequence);  
  print('Total Sum (cached):', total2);
})();
