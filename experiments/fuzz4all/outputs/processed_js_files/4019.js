(async () => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) return cache.get(key);
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  };

  const fibonacci = memoize((n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  });

  const asyncFetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    print('Fetching data asynchronously...');
    const data = await asyncFetchData(url);
    print('Data fetched:', data);

    print('Calculating Fibonacci sequence with memoization...');
    for (let i = 0; i <= 10; i++) {
      await sleep(100);
      print(`Fibonacci(${i}):`, fibonacci(i));
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
