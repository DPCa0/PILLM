class AsyncEventEmitter {
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
      const listeners = this.events.get(event);
      for (const listener of listeners) {
        await listener(...args);
      }
    }
  }
}

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
(async () => {
  const emitter = new AsyncEventEmitter();

  emitter.on('data', async (data) => {
    print(`Listener 1: Received ${data}`);
    await delay(1000);
    print(`Listener 1: Processed ${data}`);
  });

  emitter.on('data', async (data) => {
    print(`Listener 2: Received ${data}`);
    await delay(500);
    print(`Listener 2: Processed ${data}`);
  });

  print('Emitting event with data: Hello, world!');
  await emitter.emit('data', 'Hello, world!');
  print('Event processing complete.');
})();
