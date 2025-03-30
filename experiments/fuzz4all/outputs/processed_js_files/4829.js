class DataFetcher {
  #cache = new Map();

  async fetchData(url) {
    if (this.#cache.has(url)) {
      print('Returning cached data');
      return this.#cache.get(url);
    }

    print('Fetching new data');
    const response = await fetch(url);
    const data = await response.json();
    this.#cache.set(url, data);
    return data;
  }
}

function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const fib = memoize(n => (n <= 1 ? n : fib(n - 1) + fib(n - 2)));

(async () => {
  const fetcher = new DataFetcher();
  const data1 = await fetcher.fetchData('https://jsonplaceholder.typicode.com/todos/1');
  print(data1);

  const data2 = await fetcher.fetchData('https://jsonplaceholder.typicode.com/todos/1');
  print(data2);

  print(fib(40));  
})();
