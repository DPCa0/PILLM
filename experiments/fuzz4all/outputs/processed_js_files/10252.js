class FibonacciSequence {
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
  return (arg) => cache.has(arg) ? cache.get(arg) : cache.set(arg, fn(arg)).get(arg);
};

const asyncFactorial = memoize(async function(n) {
  if (n <= 1) return 1;
  return n * await asyncFactorial(n - 1);
});

(async () => {
  const fib = new FibonacciSequence();
  print('First 10 Fibonacci numbers:');
  print([...fib].slice(0, 10).join(', '));

  const factorial = await asyncFactorial(5);
  print(`Factorial of 5 is: ${factorial}`);
})();

const eventLoopSimulator = async () => {
  print('Simulating event loop with microtasks:');

  Promise.resolve().then(() => print('Microtask 1: Promise resolved'));

  setTimeout(() => print('Macrotask: Timeout'), 0);

  process.nextTick(() => print('Microtask 2: nextTick'));

  Promise.resolve().then(() => print('Microtask 3: Promise resolved again'));
};

eventLoopSimulator();
