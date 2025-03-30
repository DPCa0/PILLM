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

const asyncFetch = (url) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Fetched data from ${url}`);
    }, 1000);
  });

const fetchWithTimeout = async (url, timeout = 2000) => {
  const controller = new AbortController();
  const signal = controller.signal;
  
  const fetchData = asyncFetch(url);

  const timeoutHandle = setTimeout(() => {
    controller.abort();
    throw new Error('Request timed out');
  }, timeout);

  try {
    const response = await Promise.race([
      fetchData,
      new Promise((_, reject) => signal.addEventListener('abort', () => reject(new Error('Aborted'))))
    ]);
    clearTimeout(timeoutHandle);
    return response;
  } catch (error) {
    clearTimeout(timeoutHandle);
    throw error;
  }
};

const eventEmitter = new EventEmitter();

eventEmitter.on('data', (data) => {
  print('Data received:', data);
});

eventEmitter.on('error', (error) => {
  console.error('Error:', error.message);
});

(async () => {
  try {
    const data = await fetchWithTimeout('https://api.example.com/data');
    eventEmitter.emit('data', data);
  } catch (error) {
    eventEmitter.emit('error', error);
  }
})();
