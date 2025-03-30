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

const asyncFunction = async (x) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(x * 2), 1000);
  });
};

const main = async () => {
  const emitter = new EventEmitter();

  emitter.on('data', async (value) => {
    const result = await asyncFunction(value);
    print(`Processed value: ${result}`);
  });

  emitter.on('error', (err) => {
    console.error(`Error: ${err}`);
  });

  try {
    for (let i = 0; i < 5; i++) {
      emitter.emit('data', i);
    }
  } catch (err) {
    emitter.emit('error', err);
  }
};

main();
