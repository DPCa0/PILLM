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
    const listeners = this.events.get(event) || [];
    listeners.forEach(listener => listener.apply(this, args));
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGenerator(array) {
  for (const item of array) {
    await delay(100);
    yield item;
  }
}

(async () => {
  const emitter = new EventEmitter();
  
  emitter.on('data', async data => {
    for await (const item of asyncGenerator(data)) {
      print(`Processed item: ${item}`);
    }
  });
  
  emitter.on('error', err => {
    console.error(`Error: ${err.message}`);
  });

  try {
    emitter.emit('data', [1, 2, 3, 4, 5]);
  } catch (error) {
    emitter.emit('error', error);
  }
})();
