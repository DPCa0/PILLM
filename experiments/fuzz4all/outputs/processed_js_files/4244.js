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

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncFunction = async () => {
  print('Starting async task...');
  await delay(1000);
  print('Async task completed!');
};

const withLogging = (func) => {
  return function(...args) {
    print(`Calling ${func.name} with arguments:`, args);
    const result = func(...args);
    print(`Result from ${func.name}:`, result);
    return result;
  };
};

const add = (a, b) => a + b;

const addWithLogging = withLogging(add);

(async () => {
  const emitter = new EventEmitter();

  emitter.on('data', async (data) => {
    print('Received data:', data);
    await asyncFunction();
    print('Processing completed for data:', data);
  });

  emitter.emit('data', { id: 1, message: 'Hello' });

  print('Add result:', addWithLogging(3, 5));
})();
