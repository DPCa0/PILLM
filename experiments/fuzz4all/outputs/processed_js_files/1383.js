class Fibonacci {
  *generate(n) {
    let a = 0, b = 1, idx = 0;
    while (idx++ < n) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
}

const fib = new Fibonacci();
const memoizedFib = new Proxy(fib, {
  cache: new Map(),
  get(target, prop) {
    if (prop === 'generate') {
      return function*(n) {
        if (this.cache.has(n)) {
          print('Cache hit for:', n);
          yield* this.cache.get(n);
        } else {
          const sequence = Array.from(target[prop](n));
          this.cache.set(n, sequence);
          yield* sequence;
        }
      }.bind(this);
    }
    return target[prop];
  }
});

const runAsyncTasks = async () => {
  const fibNumbers = await Promise.all(
    [5, 10, 15].map(async (n) => {
      return {
        n,
        sequence: Array.from(memoizedFib.generate(n))
      };
    })
  );

  for (const { n, sequence } of fibNumbers) {
    print(`Fibonacci sequence of ${n}: ${sequence.join(', ')}`);
  }
};

runAsyncTasks().catch(console.error);
