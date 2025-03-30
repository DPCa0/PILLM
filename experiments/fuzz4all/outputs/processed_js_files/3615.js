class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }

  async emit(event, ...args) {
    if (this.events.has(event)) {
      const listeners = this.events.get(event);
      for (const listener of listeners) {
        await listener(...args);
      }
    }
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async function() {
  const emitter = new AsyncEventEmitter();

  emitter.on('data', async (msg) => {
    await delay(1000);
    print(`Listener 1 received: ${msg}`);
  });

  emitter.on('data', async (msg) => {
    await delay(500);
    print(`Listener 2 received: ${msg}`);
  });

  print('Emitting event...');
  await emitter.emit('data', 'Hello, world!');
  print('Event emitted.');
})();
