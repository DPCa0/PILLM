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
      this.events.get(event).forEach(listener => listener.apply(this, args));
    }
  }
}

const asyncOperation = (value) =>
  new Promise((resolve, reject) => setTimeout(() => {
    value > 0 ? resolve(value * 2) : reject(new Error('Invalid value'));
  }, 1000));

const asyncGeneratorExample = async function* (values) {
  for (const value of values) {
    try {
      const result = await asyncOperation(value);
      yield result;
    } catch (error) {
      yield error.message;
    }
  }
};

const main = async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('data', (data) => {
    print(`Received: ${data}`);
  });

  const numbers = [1, 2, 0, 3, -1];
  for await (const result of asyncGeneratorExample(numbers)) {
    eventEmitter.emit('data', result);
  }
};

main();
