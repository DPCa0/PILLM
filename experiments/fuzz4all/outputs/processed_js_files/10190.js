class EventEmitter {
  #events = new Map();

  on(event, listener) {
    if (!this.#events.has(event)) this.#events.set(event, new Set());
    this.#events.get(event).add(listener);
  }

  off(event, listener) {
    if (this.#events.has(event)) this.#events.get(event).delete(listener);
  }

  emit(event, ...args) {
    if (this.#events.has(event)) {
      this.#events.get(event).forEach(listener => listener(...args));
    }
  }
}

const asyncOperation = (value) => new Promise((resolve) => {
  setTimeout(() => resolve(value * 2), 1000);
});

async function* asyncGenerator(limit) {
  for (let i = 0; i < limit; i++) {
    yield await asyncOperation(i);
  }
}

(async () => {
  const emitter = new EventEmitter();

  const logListener = (data) => print('Received:', data);
  emitter.on('data', logListener);

  for await (const value of asyncGenerator(5)) {
    emitter.emit('data', value);
  }

  emitter.off('data', logListener);
  print('Finished processing');
})();
