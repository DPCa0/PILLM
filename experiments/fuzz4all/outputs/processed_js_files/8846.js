class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }

  async emit(event, ...args) {
    if (this.events.has(event)) {
      const listeners = this.events.get(event);
      await Promise.all(listeners.map(listener => listener(...args)));
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const emitter = new AsyncEventEmitter();

  emitter.on('data', async data => {
    await delay(1000);
    print(`Listener 1 received: ${data}`);
  });

  emitter.on('data', async data => {
    await delay(500);
    print(`Listener 2 received: ${data}`);
  });

  print('Emitting event');
  await emitter.emit('data', 'Hello, world!');
  print('All listeners processed');
})();
