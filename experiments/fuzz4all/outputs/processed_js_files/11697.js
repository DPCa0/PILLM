const crypto = require('crypto');

class EventEmitter {
  #listeners = new Map();

  on(event, listener) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, []);
    }
    this.#listeners.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.#listeners.has(event)) {
      this.#listeners.get(event).forEach(listener => listener(...args));
    }
  }
}

const memoize = fn => {
  const cache = new Map();
  return async function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = await fn(...args);
    cache.set(key, result);
    return result;
  };
};

const getRandomHash = memoize(async (input) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const hash = crypto.createHash('sha256').update(input).digest('hex');
      resolve(hash);
    }, 2000);
  });
});

class ComplexApplication {
  #emitter = new EventEmitter();

  run() {
    this.#emitter.on('data', async (data) => {
      const hash = await getRandomHash(data);
      print(`Hash for '${data}': ${hash}`);
    });

    this.processData();
  }

  async processData() {
    const inputs = ['apple', 'banana', 'cherry'];
    for (const input of inputs) {
      this.#emitter.emit('data', input);
    }
  }
}

new ComplexApplication().run();
