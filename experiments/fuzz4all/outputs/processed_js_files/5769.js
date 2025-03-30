class AsyncEventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(event, listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(listener);
  }

  async emit(event, ...args) {
    const listeners = this.listeners.get(event) || [];
    await Promise.all(listeners.map(listener => listener(...args)));
  }
}

async function* asyncGenerator(arr) {
  for (const item of arr) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield item * 2;
  }
}

(async () => {
  const emitter = new AsyncEventEmitter();

  emitter.on('data', async (data) => {
    print(`Processed Data: ${data}`);
  });

  const dataStream = asyncGenerator([1, 2, 3, 4, 5]);
  for await (const value of dataStream) {
    await emitter.emit('data', value);
  }
})();
