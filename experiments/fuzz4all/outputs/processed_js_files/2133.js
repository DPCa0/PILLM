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
      for (const listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }
}

const asyncOperation = () => new Promise(resolve => setTimeout(() => resolve('Operation Complete'), 1000));

async function* asyncGenerator() {
  for (let i = 0; i < 3; i++) {
    yield await asyncOperation();
  }
}

(async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('data', data => print(`Received: ${data}`));
  eventEmitter.on('complete', () => print('All operations completed!'));

  for await (const data of asyncGenerator()) {
    eventEmitter.emit('data', data);
  }
  
  eventEmitter.emit('complete');
})();
