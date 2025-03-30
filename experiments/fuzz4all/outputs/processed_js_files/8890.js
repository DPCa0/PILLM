class Fibonacci {
  *[Symbol.iterator]() {
    let a = 0, b = 1;
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
}

const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
};

const asyncAdd = (a, b) => new Promise(resolve => {
  setTimeout(() => resolve(a + b), 100);
});

const sumFibonacci = async (limit) => {
  const fib = new Fibonacci();
  const fibSeq = [...fib].slice(0, limit);
  const add = memoize(asyncAdd);
  let sum = 0;
  for (const num of fibSeq) {
    sum = await add(sum, num);
  }
  return sum;
};

(async () => {
  try {
    const limit = 10;
    const result = await sumFibonacci(limit);
    print(`Sum of first ${limit} Fibonacci numbers is:`, result);
  } catch (error) {
    console.error('Error calculating sum:', error);
  }
})();
