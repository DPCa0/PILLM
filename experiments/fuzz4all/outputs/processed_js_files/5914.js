(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  class FibonacciGenerator {
    constructor() {
      this.memo = new Map([[0, 0], [1, 1]]);
    }

    compute(n) {
      if (this.memo.has(n)) return this.memo.get(n);
      const result = this.compute(n - 1) + this.compute(n - 2);
      this.memo.set(n, result);
      return result;
    }

    *generateSequence(limit) {
      for (let i = 0; i < limit; i++) {
        yield this.compute(i);
      }
    }
  }

  const fib = new FibonacciGenerator();

  const fetchData = async url => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Fetching error:', error);
    }
  };

  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  const data = await fetchData(url);

  const runFibonacciAndDisplayData = async () => {
    print('Fibonacci Sequence:');
    for (const num of fib.generateSequence(10)) {
      await delay(500);
      print(num);
    }

    print('\nFetched Data:', data);
  };

  runFibonacciAndDisplayData();
})();
