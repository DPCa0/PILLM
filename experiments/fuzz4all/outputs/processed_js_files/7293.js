class AsyncEventEmitter {
  #events = new Map();

  on(event, listener) {
    if (!this.#events.has(event)) {
      this.#events.set(event, new Set());
    }
    this.#events.get(event).add(listener);
    return this;
  }

  off(event, listener) {
    if (this.#events.has(event)) {
      this.#events.get(event).delete(listener);
    }
    return this;
  }

  emit(event, ...args) {
    const listeners = this.#events.get(event);
    if (listeners) {
      return Promise.all(
        Array.from(listeners).map(listener => listener(...args))
      );
    }
    return Promise.resolve([]);
  }
}

const asyncEE = new AsyncEventEmitter();

(async () => {
  const asyncListener = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    print(`Received: ${data}`);
  };

  asyncEE.on('data', asyncListener);

  await asyncEE.emit('data', 'Hello, Async World!');
  asyncEE.off('data', asyncListener);

  await asyncEE.emit('data', 'This will not be logged');
})();
