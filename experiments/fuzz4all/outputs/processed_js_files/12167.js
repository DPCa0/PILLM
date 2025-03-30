class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }

  async emit(event, ...args) {
    if (this.events.has(event)) {
      const promises = this.events.get(event).map(listener => listener(...args));
      await Promise.all(promises);
    }
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.set(
        event, 
        this.events.get(event).filter(l => l !== listener)
      );
    }
  }
}

const delayedLogger = async (message, delay) => {
  return new Promise(resolve => {
    setTimeout(() => {
      print(message);
      resolve();
    }, delay);
  });
};

(async () => {
  const emitter = new AsyncEventEmitter();

  emitter.on('greet', async (name) => {
    await delayedLogger(`Hello, ${name}!`, 1000);
  });

  emitter.on('greet', async (name) => {
    await delayedLogger(`How are you, ${name}?`, 500);
  });

  await emitter.emit('greet', 'Alice');

  const logFarewell = async (name) => {
    await delayedLogger(`Goodbye, ${name}!`, 700);
  };
  emitter.on('farewell', logFarewell);

  await emitter.emit('farewell', 'Alice');
  emitter.off('farewell', logFarewell);
  await emitter.emit('farewell', 'Alice');   
})();
