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

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      for (const listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }
}

const asyncIterable = {
  [Symbol.asyncIterator]() {
    return {
      max: 5,
      current: 0,
      async next() {
        if (this.current < this.max) {
          return Promise.resolve({ value: this.current++, done: false });
        }
        return Promise.resolve({ done: true });
      }
    };
  }
};

const performAsyncActions = async () => {
  for await (const num of asyncIterable) {
    print(`Async iteration: ${num}`);
  }
};

const eventEmitter = new EventEmitter();

eventEmitter.on('start', async () => {
  print('Async actions starting...');
  await performAsyncActions();
  print('Async actions finished.');
});

eventEmitter.on('greeting', (name) => {
  print(`Hello, ${name}!`);
});

eventEmitter.emit('start');
eventEmitter.emit('greeting', 'world');
