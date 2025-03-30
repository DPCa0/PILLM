class EventEmitter {
  #events = new Map();

  on(event, listener) {
    if (!this.#events.has(event)) this.#events.set(event, new Set());
    this.#events.get(event).add(listener);
  }

  emit(event, ...args) {
    if (this.#events.has(event)) {
      this.#events.get(event).forEach(listener => listener(...args));
    }
  }

  off(event, listener) {
    if (this.#events.has(event)) {
      this.#events.get(event).delete(listener);
      if (this.#events.get(event).size === 0) {
        this.#events.delete(event);
      }
    }
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    return await response.json();
  } catch (error) {
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

(async () => {
  const apiEventEmitter = new EventEmitter();

  const apiURL = 'https://jsonplaceholder.typicode.com/posts/1';
  
  apiEventEmitter.on('fetchStart', () => print('Fetching started...'));
  apiEventEmitter.on('fetchSuccess', (data) => print('Data fetched:', data));
  apiEventEmitter.on('fetchError', (error) => console.error('Fetch error:', error));

  apiEventEmitter.emit('fetchStart');
  
  try {
    const data = await fetchWithTimeout(apiURL, 3000);
    apiEventEmitter.emit('fetchSuccess', data);
  } catch (error) {
    apiEventEmitter.emit('fetchError', error);
  }
})();
