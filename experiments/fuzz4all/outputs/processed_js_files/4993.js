class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }

  async emit(event, ...args) {
    if (this.events.has(event)) {
      const handlers = this.events.get(event);
      for (const handler of handlers) {
        await handler(...args);
      }
    }
  }

  on(event, handler) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(handler);
    return () => this.off(event, handler);
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

  once(event, handler) {
    const wrapper = async (...args) => {
      await handler(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

const emitter = new AsyncEventEmitter();

emitter.once('data', async (url) => {
  try {
    const data = await fetchData(url);
    print('Fetched data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const sampleUrl = 'https://jsonplaceholder.typicode.com/todos/1';
emitter.emit('data', sampleUrl);
