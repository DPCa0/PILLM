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
    if (!this.events.has(event)) return;
    for (const listener of this.events.get(event)) {
      listener(...args);
    }
  }
}

const asyncOperation = async (num) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
};

const compose = (...functions) => (initialValue) =>
  functions.reduceRight((acc, fn) => fn(acc), initialValue);

const squareAndDouble = compose(
  (num) => num * 2,
  (num) => asyncOperation(num)
);

(async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('calculation', (result) => {
    print(`Calculated Result: ${result}`);
  });

  const num = 5;
  const result = await squareAndDouble(num);
  eventEmitter.emit('calculation', await result);
})();
