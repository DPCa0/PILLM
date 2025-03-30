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

  off(event, listenerToRemove) {
    if (!this.events.has(event)) return;
    const updatedListeners = this.events.get(event).filter(listener => listener !== listenerToRemove);
    this.events.set(event, updatedListeners);
  }

  async emit(event, ...args) {
    if (!this.events.has(event)) return;
    const listeners = this.events.get(event).slice();
    for (const listener of listeners) {
      await listener(...args);
    }
  }
}

const emitter = new AsyncEventEmitter();

emitter.on('data', async data => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  print(`Received: ${data}`);
});

emitter.on('data', async data => {
  await new Promise(resolve => setTimeout(resolve, 500));
  print(`Processed: ${data}`);
});

(async () => {
  print('Starting event emission:');
  await emitter.emit('data', 'Sample Data');
  print('Finished event emission');
})();
