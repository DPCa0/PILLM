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

const asyncOperation = async (value) => {
  return new Promise((resolve) => setTimeout(() => resolve(value * 2), 1000));
};

const main = async () => {
  const emitter = new EventEmitter();

  emitter.on('data', async (input) => {
    const result = await asyncOperation(input);
    print(`Processed result: ${result}`);
  });

  const numbers = [1, 2, 3, 4, 5];
  
  numbers.forEach(num => {
    setImmediate(() => emitter.emit('data', num));
  });

  const deferredOps = numbers.map(async (num) => await asyncOperation(num));
  const resolvedOps = await Promise.all(deferredOps);
  
  print('All operations completed: ', resolvedOps);
};

main();
