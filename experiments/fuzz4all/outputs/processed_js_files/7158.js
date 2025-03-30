class AsyncEventEmitter {
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

  async emitAsync(event, ...args) {
    if (this.events.has(event)) {
      await Promise.all(this.events.get(event).map(listener => listener(...args)));
    }
  }
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const asyncEmitter = new AsyncEventEmitter();

asyncEmitter.on('greet', async (name) => {
  await sleep(1000);
  print(`Hello, ${name}! (after 1s)`);
});

asyncEmitter.on('greet', async (name) => {
  await sleep(2000);
  print(`Hello, ${name}! (after 2s)`);
});

(async () => {
  print('Emitting async events...');
  await asyncEmitter.emitAsync('greet', 'Alice');
  print('All async events have been processed.');
})();
