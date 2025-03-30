class ComplexCalculator {
  #history = [];

  constructor() {
    this.memoizedFibonacci = this.memoize(this.fibonacci);
  }

  memoize(fn) {
    const cache = new Map();
    return (...args) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn.apply(this, args);
      cache.set(key, result);
      this.#history.push({ fn: fn.name, args, result });
      return result;
    };
  }

  *primeGenerator(max) {
    let num = 2;
    const primes = [];
    while (num <= max) {
      if (primes.every(p => num % p !== 0)) {
        yield num;
        primes.push(num);
      }
      num++;
    }
  }

  fibonacci(n) {
    if (n <= 1) return n;
    return this.memoizedFibonacci(n - 1) + this.memoizedFibonacci(n - 2);
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      print('Fetched Data:', data);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  }

  printHistory() {
    print('Computation History:', this.#history);
  }
}

(async () => {
  const calculator = new ComplexCalculator();

  print('Memoized Fibonacci:', calculator.memoizedFibonacci(10));
  calculator.printHistory();

  print('Primes up to 10:');
  for (let prime of calculator.primeGenerator(10)) {
    print(prime);
  }

  await calculator.fetchData('https://jsonplaceholder.typicode.com/posts/1');
})();
