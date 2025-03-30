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

const promiseTimeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function* asyncGenerator(array) {
  for (const item of array) {
    await promiseTimeout(1000);
    yield item;
  }
}

const emitter = new EventEmitter();
emitter.on('data', (data) => print('Received:', data));

(async function() {
  const generator = asyncGenerator([1, 2, 3, 4, 5]);
  for await (const value of generator) {
    emitter.emit('data', value);
  }
  print('All data processed.');
})();
