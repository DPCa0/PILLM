class AsyncEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  async emit(event, ...args) {
    if (this.events.has(event)) {
      for (const listener of this.events.get(event)) {
        await listener(...args);
      }
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

(async () => {
  const emitter = new AsyncEmitter();

  emitter.on('data', async data => {
    print('Data received:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    print('Finished processing data');
  });

  emitter.on('error', error => {
    console.error('An error occurred:', error);
  });

  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    await emitter.emit('data', data);
  } catch (error) {
    await emitter.emit('error', error);
  }
})();
