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
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const asyncOperation = (value, time) => {
  return new Promise(resolve => setTimeout(() => resolve(value), time));
};

(async function() {
  const emitter = new EventEmitter();

  emitter.on('data', data => {
    print(`Data received: ${data}`);
  });

  emitter.on('complete', () => {
    print('All operations complete.');
  });

  const operations = [
    asyncOperation('First Result', 1000),
    asyncOperation('Second Result', 500),
    asyncOperation('Third Result', 1500)
  ];

  for await (let result of operations) {
    emitter.emit('data', await result);
  }

  emitter.emit('complete');
})();
