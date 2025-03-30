class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  async emit(event, ...args) {
    if (this.events.has(event)) {
      const promises = this.events.get(event).map(listener => listener(...args));
      await Promise.all(promises);
    }
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

function memoize(fn) {
  const cache = new Map();
  return async function(...args) {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
}

const memoizedFetchData = memoize(fetchData);
const eventEmitter = new AsyncEventEmitter();

eventEmitter.on('dataFetched', async (url) => {
  const data = await memoizedFetchData(url);
  print(`Data from ${url}:`, data);
});

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  await eventEmitter.emit('dataFetched', url);
  await eventEmitter.emit('dataFetched', url);  
})();
