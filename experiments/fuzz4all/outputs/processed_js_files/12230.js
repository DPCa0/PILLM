class AsyncEventEmitter {
  #listeners = new Map();

  on(event, listener) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event).add(listener);
    return this;
  }

  off(event, listener) {
    this.#listeners.get(event)?.delete(listener);
    return this;
  }

  async emit(event, ...args) {
    if (!this.#listeners.has(event)) return false;
    const listeners = this.#listeners.get(event);
    await Promise.all([...listeners].map(listener => listener(...args)));
    return true;
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async function main() {
  const emitter = new AsyncEventEmitter();

  emitter.on('data', async (data) => {
    await delay(100);
    print(`Listener 1 received: ${data}`);
  });

  emitter.on('data', async (data) => {
    await delay(50);
    print(`Listener 2 received: ${data}`);
  });

  print('Emitting event...');
  await emitter.emit('data', 'Hello, Async World!');
  print('Event emitted successfully.');
})();
