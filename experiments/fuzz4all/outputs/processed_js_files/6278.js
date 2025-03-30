class AsyncEventEmitter {
  #events = new Map();

  on(event, listener) {
    if (!this.#events.has(event)) {
      this.#events.set(event, []);
    }
    this.#events.get(event).push(listener);
  }

  off(event, listenerToRemove) {
    if (!this.#events.has(event)) return;
    const listeners = this.#events.get(event).filter(listener => listener !== listenerToRemove);
    this.#events.set(event, listeners);
  }

  emit(event, ...args) {
    if (!this.#events.has(event)) return;
    for (const listener of this.#events.get(event)) {
      listener(...args);
    }
  }

  async emitAsync(event, ...args) {
    if (!this.#events.has(event)) return;
    const promises = this.#events.get(event).map(listener => listener(...args));
    await Promise.all(promises);
  }
}

 
const eventEmitter = new AsyncEventEmitter();

eventEmitter.on('data', async (data) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  print(`Async Processed: ${data}`);
});

eventEmitter.on('data', (data) => {
  print(`Sync Processed: ${data}`);
});

(async () => {
  print('Emitting...');
  await eventEmitter.emitAsync('data', 'Hello, advanced JavaScript!');
  print('All listeners have been processed.');
})();
