class DataFetcher {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }

  async fetchData() {
    try {
      const response = await fetch(this.apiEndpoint);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  }
}

function* generateFibonacci(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

(async function main() {
  const dataFetcher = new DataFetcher('https://jsonplaceholder.typicode.com/posts');
  const data = await dataFetcher.fetchData();

  if (data) {
    print('Fetched data:', data.slice(0, 2));  

    const fibonacciLimit = 10;
    print(`First ${fibonacciLimit} Fibonacci numbers:`);
    const fibGenerator = generateFibonacci(fibonacciLimit);
    print([...fibGenerator].join(', '));
  }
})();
