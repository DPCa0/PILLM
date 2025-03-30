class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      for (const listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }
}

const asyncIteratorExample = async function* (count) {
  for (let i = 0; i < count; i++) {
    yield new Promise((resolve) => setTimeout(() => resolve(i), 100));
  }
};

(async () => {
  const emitter = new EventEmitter();

  emitter.on('data', (data) => {
    print(`Received data: ${data}`);
  });

  emitter.on('end', () => {
    print('No more data.');
  });

  for await (const data of asyncIteratorExample(5)) {
    emitter.emit('data', data);
  }

  emitter.emit('end');
})();
