class Fibonacci {
  #memo = new Map();  

  constructor() {
    this.#memo.set(0, 0);
    this.#memo.set(1, 1);
  }

  calculate(n) {
    if (this.#memo.has(n)) return this.#memo.get(n);
    let result = this.calculate(n - 1) + this.calculate(n - 2);
    this.#memo.set(n, result);
    return result;
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
  print(`Fibonacci of 10: ${fib.calculate(10)}`);

  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Fetched data:', data);
  } catch (error) {
    console.error('Fetching data failed:', error);
  }

  const promise1 = Promise.resolve(3);
  const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'foo'));
  const promise3 = 42;

  const results = await Promise.all([promise1, promise2, promise3]);
  print('Promise.all results:', results);
})();
