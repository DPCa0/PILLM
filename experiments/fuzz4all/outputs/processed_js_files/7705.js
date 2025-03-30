class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

function withRetry(fn, retries = 3) {
  return async function (...args) {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn(...args);
      } catch (error) {
        if (i === retries - 1) throw error;
      }
    }
  };
}

const emitter = new EventEmitter();
emitter.on('data', data => print('Received data:', data));
emitter.on('error', error => console.error('Error occurred:', error));

const retryFetchData = withRetry(fetchData, 3);
const apiURL = 'https://jsonplaceholder.typicode.com/todos/1';

(async () => {
  try {
    const data = await retryFetchData(apiURL);
    emitter.emit('data', data);
  } catch (error) {
    emitter.emit('error', error);
  }
})();
