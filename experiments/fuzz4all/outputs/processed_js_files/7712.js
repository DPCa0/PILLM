class Fibonacci {
  *generateSequence(n) {
    let a = 0, b = 1;
    for (let i = 0; i < n; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
}

const asyncFibonacci = async (n) => {
  const fib = new Fibonacci();
  const sequence = fib.generateSequence(n);
  for await (const num of sequence) {
    await new Promise(resolve => setTimeout(resolve, 100));
    print(num);
  }
};

const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const expensiveFunction = memoize((x) => {
  print(`Computing for ${x}`);
  return x * x;
});

(async () => {
  print('Fibonacci Sequence:');
  await asyncFibonacci(10);
  print('Memoization Demo:');
  print(expensiveFunction(5));  
  print(expensiveFunction(5));  
})();
