class FibonacciGenerator {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map();
  }

  *[Symbol.iterator]() {
    let [a, b, index] = [0, 1, 0];
    while (index++ < this.limit) {
      yield a;
      [a, b] = [b, this.memoizedFibo(index)];
    }
  }

  memoizedFibo(n) {
    if (this.memo.has(n)) {
      return this.memo.get(n);
    }
    const value = n <= 1 ? n : this.memoizedFibo(n - 1) + this.memoizedFibo(n - 2);
    this.memo.set(n, value);
    return value;
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

(async () => {
  const fiboLimit = 10;
  const fiboSequence = new FibonacciGenerator(fiboLimit);
  print(`Fibonacci sequence up to ${fiboLimit}:`, [...fiboSequence]);

  try {
    const data = await fetchData('https://api.example.com/data');
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
