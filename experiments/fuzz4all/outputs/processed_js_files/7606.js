class Observable {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(fn) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }

  notify(data) {
    this.subscribers.forEach(fn => fn(data));
  }
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

function cache(fn) {
  const cacheMap = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cacheMap.has(key)) {
      cacheMap.set(key, fn(...args));
    }
    return cacheMap.get(key);
  };
}

const memoizedFetchJson = cache(fetchJson);

const observer = new Observable();

observer.subscribe(data => print('Received data:', data));

async function main() {
  try {
    const data = await memoizedFetchJson('https://jsonplaceholder.typicode.com/todos/1');
    observer.notify(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

main();
