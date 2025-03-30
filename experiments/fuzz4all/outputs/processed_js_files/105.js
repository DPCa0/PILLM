class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }
  
  emit(event, ...args) {
    if (!this.events.has(event)) return;
    for (const listener of this.events.get(event)) {
      listener(...args);
    }
  }
  
  off(event, listenerToRemove) {
    if (!this.events.has(event)) return;
    const listeners = this.events.get(event).filter(listener => listener !== listenerToRemove);
    this.events.set(event, listeners);
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const memoizedFetchData = memoize(fetchData);

const eventEmitter = new EventEmitter();
eventEmitter.on('data', async (url) => {
  try {
    const data = await memoizedFetchData(url);
    print('Data fetched:', data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
});

const url = 'https://jsonplaceholder.typicode.com/posts/1';
eventEmitter.emit('data', url);

 
 
