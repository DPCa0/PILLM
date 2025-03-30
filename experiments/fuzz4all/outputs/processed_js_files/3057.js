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

const asyncAdd = async (a, b) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(a + b), 1000);
  });
  return await promise;
};

const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
};

const addListener = memoize(asyncAdd);

(async () => {
  const emitter = new EventEmitter();

  emitter.on('calculate', async (a, b) => {
    print(`Result: ${await addListener(a, b)}`);
  });

  emitter.emit('calculate', 2, 3);
  emitter.emit('calculate', 2, 3);  
  emitter.emit('calculate', 5, 10);
})();
