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

async function fetchWithTimeout(url, timeout = 3000) {
  const controller = new AbortController();
  const signal = controller.signal;

  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal });
    clearTimeout(timeoutId);
    return response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}

const emitter = new EventEmitter();
const dataFetched = (data) => print('Data fetched:', data);
const fetchFailed = (error) => console.error('Fetch failed:', error);

emitter.on('data', dataFetched);
emitter.on('error', fetchFailed);

(async () => {
  try {
    const data = await fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1', 5000);
    emitter.emit('data', data);
  } catch (error) {
    emitter.emit('error', error);
  }
})();
