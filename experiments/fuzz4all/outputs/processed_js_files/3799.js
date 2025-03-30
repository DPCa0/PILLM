class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }

  async emit(event, ...args) {
    if (this.events.has(event)) {
      const handlers = this.events.get(event);
      await Promise.all(handlers.map(handler => handler(...args)));
    }
  }

  on(event, handler) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(handler);
  }

  off(event, handler) {
    if (this.events.has(event)) {
      const handlers = this.events.get(event).filter(h => h !== handler);
      if (handlers.length > 0) {
        this.events.set(event, handlers);
      } else {
        this.events.delete(event);
      }
    }
  }
}

const fetchJson = async url => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error fetching ${url}: ${response.statusText}`);
  return await response.json();
};

const main = async () => {
  const emitter = new AsyncEventEmitter();

  emitter.on('data', async data => {
    print('Data received:', data);
  });

  emitter.on('error', error => {
    console.error('An error occurred:', error.message);
  });

  try {
    const data = await fetchJson('https://jsonplaceholder.typicode.com/posts/1');
    await emitter.emit('data', data);
  } catch (error) {
    await emitter.emit('error', error);
  }
};

main();
