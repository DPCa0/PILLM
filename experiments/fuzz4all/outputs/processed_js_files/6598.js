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
      this.events.get(event).forEach(listener => listener.apply(this, args));
    }
  }
  
  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }
}

const asyncProcess = async (value) => {
  return new Promise(resolve => setTimeout(() => resolve(value * 2), 1000));
};

(async () => {
  const eventBus = new EventEmitter();
  
  const processHandler = async (num) => {
    const result = await asyncProcess(num);
    print(`Processed Result: ${result}`);
  };

  eventBus.on('process', processHandler);
  
  eventBus.emit('process', 5);
  
  setTimeout(() => {
    eventBus.off('process', processHandler);
    print('Listener removed.');
    eventBus.emit('process', 10);
  }, 2000);
})();
