class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncFunction = async () => {
  print("Async operation started.");
  await delay(1000);
  print("Async operation completed.");
};

const executeWithRetry = async (fn, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      await fn();
      break;
    } catch (error) {
      if (i === retries - 1) {
        console.error('Function failed after maximum retries:', error);
      } else {
        console.warn(`Retrying function (${i + 1}/${retries})...`);
      }
    }
  }
};

const eventEmitter = new EventEmitter();

eventEmitter.on('greet', async name => {
  print(`Hello, ${name}!`);
  await executeWithRetry(asyncFunction);
});

eventEmitter.emit('greet', 'World');
