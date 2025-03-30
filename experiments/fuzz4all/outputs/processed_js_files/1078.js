 

class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map();
  }

  *generateSequence() {
    let [a, b] = [0, 1];
    while (a <= this.limit) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  memoizedFibonacci(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    if (n <= 1) return n;

    const result = this.memoizedFibonacci(n - 1) + this.memoizedFibonacci(n - 2);
    this.memo.set(n, result);
    return result;
  }

  async fetchFibonacciFact() {
    const response = await fetch('https://catfact.ninja/fact');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.fact;
  }
}

(async () => {
  const limit = 100;
  const fibonacci = new Fibonacci(limit);

  print(`Fibonacci sequence up to ${limit}:`);
  print([...fibonacci.generateSequence()]);

  const n = 10;
  print(`Memoized Fibonacci of ${n}: ${fibonacci.memoizedFibonacci(n)}`);

  try {
    print('Fetching a random fact...');
    const fact = await fibonacci.fetchFibonacciFact();
    print(`Random fact: ${fact}`);
  } catch (error) {
    console.error('Error fetching fact:', error);
  }
})();
