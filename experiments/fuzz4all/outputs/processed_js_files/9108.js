class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }

  async emit(event, ...args) {
    if (this.events.has(event)) {
      for (const listener of this.events.get(event)) {
        await listener(...args);
      }
    }
  }
}

(async () => {
  const emitter = new AsyncEventEmitter();

  emitter.on('data', async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    print(`Processed data: ${data}`);
  });

  emitter.on('data', async (data) => {
    print(`Logging data: ${data}`);
  });

  print('Emitting data event...');
  await emitter.emit('data', 'some valuable data');
  print('Event emitted and processed.');
})();
