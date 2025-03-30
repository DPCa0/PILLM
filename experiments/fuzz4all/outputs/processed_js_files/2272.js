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

const asyncOperation = async () => {
  return new Promise(resolve => setTimeout(() => resolve('Operation Complete'), 1000));
};

const main = async () => {
  const eventEmitter = new EventEmitter();
  
  const result = await asyncOperation();
  
  eventEmitter.on('completed', message => print(`Event received: ${message}`));
  
  eventEmitter.emit('completed', result);
};

main();
