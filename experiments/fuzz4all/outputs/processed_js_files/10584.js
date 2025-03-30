class AsyncEventEmitter {
  #events = new Map();

  async emit(event, ...args) {
    const listeners = this.#events.get(event) || [];
    for (const listener of listeners) {
      await listener(...args);
    }
  }

  on(event, listener) {
    if (!this.#events.has(event)) {
      this.#events.set(event, []);
    }
    this.#events.get(event).push(listener);
  }

  off(event, listener) {
    const listeners = this.#events.get(event) || [];
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }
}

(async function demo() {
  const emitter = new AsyncEventEmitter();

  const logListener = async message => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    print(`Logged: ${message}`);
  };

  emitter.on('log', logListener);

  print('About to emit...');
  await emitter.emit('log', 'Hello, world!');
  
  emitter.off('log', logListener);
  await emitter.emit('log', 'This will not be logged.');

  print('Done.');
})();
