const asyncOperation = (data, delay) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }
  on(event, listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(listener);
  }
  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((listener) => listener(data));
    }
  }
}

const complexOperation = async () => {
  const emitter = new EventEmitter();
  
  emitter.on('start', (message) => print(`Started: ${message}`));
  emitter.on('process', (status) => print(`Processing: ${status}`));
  emitter.on('end', (result) => print(`Completed: ${result}`));

  emitter.emit('start', 'Initializing');

  const result = await Promise.allSettled([
    asyncOperation('Data 1', 1000),
    asyncOperation('Data 2', 2000),
    asyncOperation('Data 3', 1500)
  ]);

  emitter.emit('process', 'All operations settled');

  const successResults = result
    .filter((p) => p.status === 'fulfilled')
    .map((p) => p.value);

  emitter.emit('end', successResults.join(', '));
};

complexOperation();
