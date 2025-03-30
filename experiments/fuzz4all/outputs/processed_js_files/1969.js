class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }

  async emit(event, ...args) {
    const handlers = this.events.get(event) || [];
    for (let handler of handlers) {
      await handler(...args);
    }
  }

  on(event, handler) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(handler);
  }
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const emitter = new AsyncEventEmitter();

  emitter.on('greet', async (name) => {
    await wait(1000);
    print(`Hello, ${name}!`);
  });

  emitter.on('greet', async (name) => {
    await wait(500);
    print(`How are you, ${name}?`);
  });

  print('Emitting event...');
  await emitter.emit('greet', 'world');
  print('Event emitted.');
})();
