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
  
  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }
}

const asyncOperation = async () => {
  return new Promise((resolve) => setTimeout(() => resolve('Operation Complete'), 1000));
};

const main = async () => {
  const emitter = new EventEmitter();

  emitter.on('start', () => print('Starting process...'));
  emitter.on('progress', (percent) => print(`Progress: ${percent}%`));
  emitter.on('complete', (message) => print(message));
  
  emitter.emit('start');
  
  for (let i = 0; i <= 100; i += 25) {
    await new Promise(resolve => setTimeout(resolve, 250));
    emitter.emit('progress', i);
  }
  
  const result = await asyncOperation();
  emitter.emit('complete', result);
};

main().catch(console.error);
