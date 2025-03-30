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
      for (let listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }
}

const asyncOperation = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function* dataStream(interval, max) {
  for (let i = 0; i < max; i++) {
    await asyncOperation(interval);
    yield { value: Math.random(), timestamp: new Date().toISOString() };
  }
}

(async () => {
  const eventEmitter = new EventEmitter();
  
  eventEmitter.on('data', data => {
    print('Data Received:', data);
  });
  
  eventEmitter.on('end', () => {
    print('Data stream ended.');
  });

  for await (const data of dataStream(1000, 5)) {
    eventEmitter.emit('data', data);
  }

  eventEmitter.emit('end');
})();
