class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      for (let listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }
}

const asyncOperation = async (number) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(number * 2), 1000)
  );
};

(async () => {
  const emitter = new EventEmitter();

  emitter.on('data', async (num) => {
    const result = await asyncOperation(num);
    print(`Processed: ${result}`);
  });

  emitter.on('data', (num) => {
    print(`Received: ${num}`);
  });

  for await (let i of [1, 2, 3, 4, 5].map((n) => Promise.resolve(n))) {
    emitter.emit('data', i);
  }
})();
