class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  calculate(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);

    const value = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, value);

    return value;
  }

  *sequence(max) {
    for (let i = 0; i <= max; i++) {
      yield this.calculate(i);
    }
  }
}

const fib = new Fibonacci();

const sumOfEvenFibonacci = [...fib.sequence(10)]
  .filter(n => n % 2 === 0)
  .reduce((acc, n) => acc + n, 0);

(async () => {
  const fetchJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
  };

  try {
    const apiData = await fetchJson('https://jsonplaceholder.typicode.com/posts/1');
    print('Fetched Post Title:', apiData.title);
  } catch (error) {
    console.error('Fetching error:', error);
  }
})();

print('Sum of even Fibonacci numbers up to 10:', sumOfEvenFibonacci);
