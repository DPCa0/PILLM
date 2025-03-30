class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithTimeout = async (url, timeout = 5000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    return response.json();
  } finally {
    clearTimeout(id);
  }
};

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const asyncIterable = async function* (items) {
  for (const item of items) {
    yield await delay(1000).then(() => item);
  }
};

const main = async () => {
  const emitter = new EventEmitter();
  emitter.on('data', data => print('Received:', data));
  emitter.on('error', error => console.error('Error:', error));

  const debouncedLog = debounce(console.log, 500);
  debouncedLog('This will be delayed by 500ms');
  
  try {
    const data = await fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1');
    emitter.emit('data', data);
  } catch (error) {
    emitter.emit('error', error);
  }

  for await (const item of asyncIterable([1, 2, 3, 4, 5])) {
    print('Async item:', item);
  }
};

main();
