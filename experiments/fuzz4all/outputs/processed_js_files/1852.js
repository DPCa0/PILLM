class EventEmitter {
  #listeners = new Map();

  on(event, listener) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, []);
    }
    this.#listeners.get(event).push(listener);
  }

  emit(event, ...args) {
    const listeners = this.#listeners.get(event);
    if (listeners) {
      listeners.forEach(listener => listener(...args));
    }
  }
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

const complexOperation = memoize((a, b) => a ** b);

(async () => {
  const emitter = new EventEmitter();

  emitter.on('data', async (url) => {
    try {
      print('Fetching data...');
      const data = await fetchData(url);
      print('Data fetched:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });

  print('Starting complex operations...');
  print('2^3 =', complexOperation(2, 3));
  print('5^4 =', complexOperation(5, 4));

  print('Waiting for 3 seconds...');
  await sleep(3000);

  print('Emitting data event...');
  emitter.emit('data', 'https://jsonplaceholder.typicode.com/todos/1');
})();
