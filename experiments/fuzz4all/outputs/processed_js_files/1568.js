 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Property ${prop.toString()} has been accessed.`);
    return Reflect.get(target, prop, receiver);
  }
};

 
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      const result = fn(...args);
      cache.set(key, result);
    }
    return cache.get(key);
  };
};

 
function* fibonacci(n) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < n; i++) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
(async () => {
  try {
    const data = await fetchData('https://api.example.com/data');
    print('Fetched Data:', data);

    const proxyData = new Proxy(data, handler);
    print('Accessing proxyData property:', proxyData.someProperty);

    const fib = memoize((n) => [...fibonacci(n)]);
    print('First 10 Fibonacci numbers:', fib(10));
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
