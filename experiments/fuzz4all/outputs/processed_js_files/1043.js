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

const asyncOperation = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve("Operation Complete!"), 1000);
  });
};

(async () => {
  const emitter = new EventEmitter();
  const promiseHandler = Symbol('promiseHandler');

  emitter.on('data', (data) => {
    print(`Data received: ${data}`);
  });

  emitter.on('asyncEvent', async () => {
    const message = await asyncOperation();
    print(message);
  });

  emitter.on(promiseHandler, async () => {
    const data = await new Promise(resolve => setTimeout(() => resolve("Promise Resolved!"), 2000));
    emitter.emit('data', data);
  });

  emitter.emit('asyncEvent');
  emitter.emit(promiseHandler);

  const dataList = ['Alpha', 'Beta', 'Gamma'];

  dataList.map(async (item) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    print(`Processed: ${item}`);
  });

})();
