class EventEmitter {
  #listeners = new Map();

  on(event, listener) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event).add(listener);
  }

  emit(event, ...args) {
    if (this.#listeners.has(event)) {
      for (const listener of this.#listeners.get(event)) {
        listener(...args);
      }
    }
  }

  off(event, listener) {
    if (this.#listeners.has(event)) {
      this.#listeners.get(event).delete(listener);
    }
  }
}

async function* asyncGenerator(max) {
  for (let i = 0; i < max; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));
    yield i;
  }
}

const eventEmitter = new EventEmitter();
eventEmitter.on('data', data => print(`Received: ${data}`));
eventEmitter.on('end', () => print('Stream ended'));

(async function() {
  for await (const num of asyncGenerator(5)) {
    eventEmitter.emit('data', num);
  }
  eventEmitter.emit('end');
})();

const dynamicProxy = new Proxy({ greeting: "Hello" }, {
  get(target, prop) {
    if (prop in target) {
      return Reflect.get(target, prop);
    }
    return `Property "${prop}" does not exist`;
  },
  set(target, prop, value) {
    if (typeof value === 'string') {
      return Reflect.set(target, prop, value.toUpperCase());
    }
    throw new Error('Values must be strings');
  }
});

dynamicProxy.greeting = 'Goodbye';
print(dynamicProxy.greeting);  
print(dynamicProxy.unknownProp);  
