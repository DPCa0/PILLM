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
      const promises = listeners.map(listener => listener(...args));
      await Promise.all(promises);
    }
  }
}

const simulateAsyncOperation = (name, delay) =>
  new Promise(resolve => setTimeout(() => {
    print(`${name} complete`);
    resolve();
  }, delay));

const emitter = new AsyncEventEmitter();

emitter.on('data', async data => {
  print(`Listener 1 received: ${data}`);
  await simulateAsyncOperation('Listener 1 Operation', 1000);
});

emitter.on('data', async data => {
  print(`Listener 2 received: ${data}`);
  await simulateAsyncOperation('Listener 2 Operation', 500);
});

(async () => {
  await emitter.emit('data', 'Hello, Advanced JavaScript!');
  print('All listeners have completed their async operations.');
})();
