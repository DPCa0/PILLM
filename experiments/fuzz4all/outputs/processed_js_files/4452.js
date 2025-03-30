class Emitter {
  #events = new Map();

  on(event, listener) {
    if (!this.#events.has(event)) {
      this.#events.set(event, []);
    }
    this.#events.get(event).push(listener);
    return this;
  }

  emit(event, ...args) {
    if (this.#events.has(event)) {
      for (const listener of this.#events.get(event)) {
        listener(...args);
      }
    }
  }

  off(event, listenerToRemove) {
    if (!this.#events.has(event)) return;

    const newListeners = this.#events
      .get(event)
      .filter(listener => listener !== listenerToRemove);

    if (newListeners.length > 0) {
      this.#events.set(event, newListeners);
    } else {
      this.#events.delete(event);
    }
  }
}

const asyncOperation = async (input) => {
  const timeout = Math.random() * 2000 + 1000;
  return new Promise((resolve) => setTimeout(() => resolve(input * 2), timeout));
};

(async function main() {
  const eventEmitter = new Emitter();

  eventEmitter.on('operationComplete', result => {
    print(`Operation complete with result: ${result}`);
  });

  const inputs = [1, 2, 3, 4, 5];
  const results = await Promise.all(
    inputs.map(async input => {
      const result = await asyncOperation(input);
      eventEmitter.emit('operationComplete', result);
      return result;
    })
  );

  print('All operations completed:', results);
})();
