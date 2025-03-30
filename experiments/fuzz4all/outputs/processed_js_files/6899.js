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

  off(event, listenerToRemove) {
    if (!this.events.has(event)) return;
    const listeners = this.events.get(event).filter(listener => listener !== listenerToRemove);
    this.events.set(event, listeners);
  }

  async emit(event, ...args) {
    if (!this.events.has(event)) return;
    const listeners = this.events.get(event);
    for (const listener of listeners) {
      await listener(...args);
    }
  }
}

 
(async () => {
  const emitter = new AsyncEventEmitter();

   
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  emitter.on('data', async (message) => {
    print(`Listener 1: Processing "${message}"...`);
    await delay(1000);
    print(`Listener 1: Done processing "${message}"`);
  });

  emitter.on('data', async (message) => {
    print(`Listener 2: Received "${message}"`);
    await delay(500);
    print(`Listener 2: Finished task with "${message}"`);
  });

  print('Emitting event "data" with payload "Hello, world!"');
  await emitter.emit('data', 'Hello, world!');
  print('All listeners finished processing.');
})();
