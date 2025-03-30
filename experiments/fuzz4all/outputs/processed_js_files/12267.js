class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }
}

const fetchWithTimeout = (url, ms) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);

  return fetch(url, { signal: controller.signal })
    .then(response => {
      clearTimeout(timeout);
      return response.json();
    })
    .catch(error => {
      clearTimeout(timeout);
      throw error;
    });
};

const emitter = new EventEmitter();
emitter.on('data', data => print('Data received:', data));
emitter.on('error', error => console.error('Error occurred:', error));

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  try {
    const data = await fetchWithTimeout(url, 5000);
    emitter.emit('data', data);
  } catch (error) {
    emitter.emit('error', error);
  }
})();

const memoize = fn => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
};

const slowFunction = num => {
  print('Computing...');
  return num ** 2;
};

const fastFunction = memoize(slowFunction);

print(fastFunction(4));  
print(fastFunction(4));  
