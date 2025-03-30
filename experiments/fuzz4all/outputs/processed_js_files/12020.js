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

class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const signal = controller.signal;

  const timeoutPromise = new Promise((_, reject) => {
    const timer = setTimeout(() => {
      controller.abort();
      reject(new Error('Request timed out'));
    }, timeout);
    
    signal.addEventListener('abort', () => clearTimeout(timer));
  });

  const fetchPromise = fetch(url, { signal });

  try {
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    return response.json();
  } catch (error) {
    throw error;
  }
}

 
const emitter = new EventEmitter();
emitter.on('data', (data) => print('Data received:', data));
emitter.on('error', (error) => console.error('Error:', error));

(async () => {
  try {
    const data = await fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1', 3000);
    emitter.emit('data', data);
  } catch (error) {
    emitter.emit('error', error);
  }
})();
