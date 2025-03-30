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

const asyncOperation = (value) => new Promise((resolve) => {
  setTimeout(() => resolve(value * 2), 1000);
});

const process = async function* (values) {
  for (const value of values) {
    yield await asyncOperation(value);
  }
};

const main = async () => {
  const eventEmitter = new EventEmitter();
  eventEmitter.on('data', (value) => {
    print(`Received: ${value}`);
  });

  const numbers = [1, 2, 3, 4, 5];
  for await (const result of process(numbers)) {
    eventEmitter.emit('data', result);
  }

  print('Processing completed!');
};

main();
