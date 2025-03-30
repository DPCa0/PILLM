class Fibonacci {
  #memo = new Map();
  
  fib(n) {
    if (n <= 1) return n;
    if (this.#memo.has(n)) return this.#memo.get(n);
    const result = this.fib(n - 1) + this.fib(n - 2);
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

(async function() {
  const fibInstance = new Fibonacci();
  const fibValue = fibInstance.fib(10);
  print(`Fibonacci(10): ${fibValue}`);

  try {
    const apiData = await fetchData('https://api.spacexdata.com/v4/launches/latest');
    print(`Latest SpaceX Launch: ${apiData.name}`);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
})();
