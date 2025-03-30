class AsyncEventEmitter {
  #listeners = new Map();

  on(event, listener) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, []);
    }
    this.#listeners.get(event).push(listener);
  }

  off(event, listener) {
    if (this.#listeners.has(event)) {
      this.#listeners.set(
        event,
        this.#listeners.get(event).filter(l => l !== listener)
      );
    }
  }

  async emit(event, ...args) {
    if (this.#listeners.has(event)) {
      const listeners = this.#listeners.get(event);
      for (const listener of listeners) {
        await listener(...args);
      }
    }
  }

  once(event, listener) {
    const onceWrapper = async (...args) => {
      await listener(...args);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const emitter = new AsyncEventEmitter();

emitter.on('data', async data => {
  await delay(1000);
  print('Listener 1 received:', data);
});

emitter.once('data', async data => {
  await delay(500);
  print('One-time listener received:', data);
});

emitter.on('data', async data => {
  await delay(2000);
  print('Listener 2 received:', data);
});

(async () => {
  print('Emitting "data" event...');
  await emitter.emit('data', { message: 'Hello, world!' });
  print('Emitting "data" event again...');
  await emitter.emit('data', { message: 'Another hello!' });
})();
