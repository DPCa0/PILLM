class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }
  
  async emit(event, ...args) {
    if (this.events.has(event)) {
      const listeners = this.events.get(event);
      for (const listener of listeners) {
        await listener(...args);
      }
    }
  }
}

const emitter = new AsyncEventEmitter();

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

emitter.on('greet', async (name) => {
  await delay(1000);
  print(`Hello, ${name}!`);
});

emitter.on('greet', async (name) => {
  await delay(500);
  print(`How are you, ${name}?`);
});

(async () => {
  await emitter.emit('greet', 'world');
})();

const proxyHandler = {
  get: function(target, prop) {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return target[prop];
    }
    throw new Error(`Property ${prop} does not exist`);
  }
};

const user = new Proxy({ name: 'Alice', age: 30 }, proxyHandler);

print(user.name);
