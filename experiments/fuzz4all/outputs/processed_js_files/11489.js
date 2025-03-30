class EventEmitter {
  #events = new Map();

  on(event, listener) {
    if (!this.#events.has(event)) {
      this.#events.set(event, []);
    }
    this.#events.get(event).push(listener);
  }

  emit(event, ...args) {
    const listeners = this.#events.get(event);
    if (listeners) {
      listeners.forEach(listener => listener(...args));
    }
  }

  off(event, listener) {
    const listeners = this.#events.get(event);
    if (listeners) {
      this.#events.set(event, listeners.filter(l => l !== listener));
    }
  }
}

const asyncOperation = () =>
  new Promise((resolve) => setTimeout(() => resolve('Async Data'), 1000));

(async () => {
  const eventEmitter = new EventEmitter();

  const listener = data => print('Received:', data);
  eventEmitter.on('data', listener);

  const result = await asyncOperation();
  eventEmitter.emit('data', result);

  eventEmitter.off('data', listener);

  const moreData = await asyncOperation();
  eventEmitter.emit('data', moreData);  
})();
