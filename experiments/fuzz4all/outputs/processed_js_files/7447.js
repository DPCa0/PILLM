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

  async emit(event, ...args) {
    if (this.events.has(event)) {
      await Promise.all(
        this.events.get(event).map(listener => listener(...args))
      );
    }
  }

  async emitSequence(event, ...args) {
    if (this.events.has(event)) {
      for (let listener of this.events.get(event)) {
        await listener(...args);
      }
    }
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const emitter = new AsyncEventEmitter();

emitter.on('greet', async (name) => {
  await delay(1000);
  print(`Hello, ${name}!`);
});

emitter.on('greet', async (name) => {
  await delay(500);
  print(`Welcome, ${name}!`);
});

(async () => {
  print('Emit simultaneously:');
  await emitter.emit('greet', 'Alice');

  print('\nEmit in sequence:');
  await emitter.emitSequence('greet', 'Bob');
})();
