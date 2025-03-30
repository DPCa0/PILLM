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
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach(listener => listener(...args));
    }
  }
}

class AsyncDataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    const response = await fetch(this.url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}

(async () => {
  const emitter = new EventEmitter();
  const dataFetcher = new AsyncDataFetcher('https://jsonplaceholder.typicode.com/posts');

  emitter.on('data', (data) => {
    print('Data received:', data);
  });

  emitter.on('error', (error) => {
    console.error('Error occurred:', error);
  });

  try {
    const data = await dataFetcher.fetchData();
    emitter.emit('data', data);
  } catch (error) {
    emitter.emit('error', error);
  }
})();
