class Observer {
  constructor() {
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  notify(data) {
    this.listeners.forEach(listener => listener(data));
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

const withRetry = (fn, retries = 3) => async (...args) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn(...args);
    } catch (error) {
      if (i === retries - 1) throw error;
    }
  }
};

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

const observer = new Observer();

observer.subscribe((data) => print('Received data:', data));

(async () => {
  try {
    const fetchWithRetry = withRetry(fetchData);
    const memoizedFetch = memoize(fetchWithRetry);
    
    const data1 = await memoizedFetch('https://jsonplaceholder.typicode.com/todos/1');
    observer.notify(data1);

    const data2 = await memoizedFetch('https://jsonplaceholder.typicode.com/todos/2');
    observer.notify(data2);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
