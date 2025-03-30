 
async function* asyncFibonacci(limit) {
  let [a, b] = [0, 1];
  while (a <= limit) {
     
    await new Promise(res => setTimeout(res, 100));
    yield a;
    [a, b] = [b, a + b];
  }
}

 
const memoize = (fn) => {
  const cache = new Map();
  return async function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      print('Fetching from cache:', key);
      return cache.get(key);
    }
    const result = await fn(...args);
    cache.set(key, result);
    return result;
  };
};

 
async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

 
const memoizedFetchData = memoize(fetchData);

 
(async () => {
  const fib = asyncFibonacci(21);

  print('Fibonacci Sequence:');
  for await (const num of fib) {
    print(num);
  }

  const dataUrl = 'https://jsonplaceholder.typicode.com/posts/1';
  
  print('\nFetch Data:');
  print(await memoizedFetchData(dataUrl));   
  print(await memoizedFetchData(dataUrl));   
})();
