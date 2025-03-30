class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return;
    this.events.get(event).forEach(listener => listener(...args));
  }

  emitAsync(event, ...args) {
    if (!this.events.has(event)) return;
    return Promise.all(this.events.get(event).map(async listener => await listener(...args)));
  }
}

(async () => {
  const emitter = new AsyncEventEmitter();

  emitter.on('data', async (msg) => {
    print(`Listener 1 received: ${msg}`);
    return new Promise(resolve => setTimeout(() => {
      print('Listener 1 processed data.');
      resolve('Listener 1 done');
    }, 1000));
  });

  emitter.on('data', async (msg) => {
    print(`Listener 2 received: ${msg}`);
    return new Promise(resolve => setTimeout(() => {
      print('Listener 2 processed data.');
      resolve('Listener 2 done');
    }, 500));
  });

  print('Emitting async event...');
  const results = await emitter.emitAsync('data', 'Hello, Async World!');
  print('All listeners done', results);
})();
