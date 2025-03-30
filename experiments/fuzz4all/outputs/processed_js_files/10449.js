class Fibonacci {
  #memo = new Map();

  constructor(limit) {
    this.limit = limit;
    this.#generateFibonacci();
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.limit; i++) {
      yield this.#memo.get(i);
    }
  }

  #generateFibonacci() {
    const fib = (n) => {
      if (n <= 1) return n;
      if (this.#memo.has(n)) return this.#memo.get(n);
      const result = fib(n - 1) + fib(n - 2);
      this.#memo.set(n, result);
      return result;
    };
    fib(this.limit);
  }
}

const asyncFetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

(async () => {
  const fibonacciSequence = new Fibonacci(10);
  print([...fibonacciSequence]);  

  try {
    const data = await asyncFetchData('https://api.github.com');
    print(data);
  } catch (error) {
    console.error('Fetching data failed:', error);
  }
})();
