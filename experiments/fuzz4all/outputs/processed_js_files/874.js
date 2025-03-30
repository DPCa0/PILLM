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

const asyncFunction = async (value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Processed: ${value}`);
    }, 1000);
  });
};

const processItems = async function* (items) {
  for (const item of items) {
    const result = await asyncFunction(item);
    yield result;
  }
};

(async () => {
  const items = [1, 2, 3, 4, 5];
  const emitter = new EventEmitter();

  emitter.on('data', (data) => print(data));
  emitter.on('complete', () => print('All items processed'));

  const generator = processItems(items);
  for await (const result of generator) {
    emitter.emit('data', result);
  }
  emitter.emit('complete');
})();
