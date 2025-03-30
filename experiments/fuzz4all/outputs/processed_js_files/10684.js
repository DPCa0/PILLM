class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  calculate(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    const result = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function* numberGenerator(limit) {
  for (let i = 0; i < limit; i++) {
    yield i;
  }
}

(async () => {
  const fib = new Fibonacci();
  print(`Fibonacci(10): ${fib.calculate(10)}`);

  const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  print('Fetched Data:', data);

  print('Generated Numbers:');
  for (const num of numberGenerator(5)) {
    print(num);
  }

  const sym1 = Symbol('unique');
  const sym2 = Symbol('unique');
  print('Are symbols equal?', sym1 === sym2);
})();
