class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }

  removeListener(event, listenerToRemove) {
    if (!this.events.has(event)) return;
    this.events.set(event, this.events.get(event).filter(listener => listener !== listenerToRemove));
  }
}

const asyncOperation = (duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Completed in ${duration} ms`);
    }, duration);
  });
};

(async () => {
  const eventEmitter = new EventEmitter();
  
  eventEmitter.on('start', msg => print(`Started: ${msg}`));
  eventEmitter.on('end', msg => print(`Ended: ${msg}`));
  
  eventEmitter.emit('start', 'Beginning async operations');
  
  const operations = [300, 500, 200].map(duration => asyncOperation(duration));
  const results = await Promise.all(operations);
  
  results.forEach(result => print(result));
  
  eventEmitter.emit('end', 'Finished async operations');
})();
