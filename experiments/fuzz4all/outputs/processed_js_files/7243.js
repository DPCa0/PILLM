class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map();
  }

  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  calculate(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    if (n <= 1) return n;
    const result = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

(async function () {
  const fibonacci = new Fibonacci(10);
  print('Fibonacci Sequence using Iterator:');
  for (let num of fibonacci) {
    print(num);
  }

  print('Fibonacci number at position 7 using Memoization:');
  print(fibonacci.calculate(7));

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  print('Fetched Data:', data);
})();
