class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    while (true) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }

  nth(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    const value = this.nth(n - 1) + this.nth(n - 2);
    this.memo.set(n, value);
    return value;
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

(async function main() {
  const fib = new Fibonacci();
  print('Fibonacci Sequence:');
  for (let [index, value] of [...fib].entries()) {
    print(value);
    if (index >= 10) break;
  }

  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    const firstPost = data[0];
    print('\nFetched Data:', JSON.stringify(firstPost, null, 2));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
