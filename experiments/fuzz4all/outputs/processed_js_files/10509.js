class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }

  async emit(event, ...args) {
    if (!this.events.has(event)) return;
    const listeners = this.events.get(event);
    for (const listener of listeners) {
      await listener(...args);
    }
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
    return this;
  }

  once(event, listener) {
    const onceWrapper = async (...args) => {
      await listener(...args);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
    return this;
  }

  off(event, listener) {
    if (!this.events.has(event)) return;
    const listeners = this.events.get(event);
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
    return this;
  }
}

 
(async () => {
  const emitter = new AsyncEventEmitter();

  emitter.on('data', async (msg) => {
    print(`Received: ${msg}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    print('Processed data');
  });

  emitter.once('init', async () => {
    print('Initialization started');
    await new Promise((resolve) => setTimeout(resolve, 500));
    print('Initialization completed');
  });

  print('Emitting init');
  await emitter.emit('init');
  print('Emitting data');
  await emitter.emit('data', 'Hello, world!');
  print('Emitting data again');
  await emitter.emit('data', 'Second message');
})();
