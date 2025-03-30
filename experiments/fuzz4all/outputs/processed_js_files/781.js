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
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach(listener => listener(...args));
    }
  }
}

const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const asyncIterable = {
  [Symbol.asyncIterator]: async function* () {
    for (let i = 1; i <= 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      yield i;
    }
  }
};

(async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('data', debounce((msg) => print(`Received: ${msg}`), 500));

  for await (const value of asyncIterable) {
    eventEmitter.emit('data', `Value: ${value}`);
  }
})();
