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
      this.events.get(event).forEach(listener => listener.apply(null, args));
    }
  }
  
  once(event, listener) {
    const onceListener = (...args) => {
      listener.apply(null, args);
      this.off(event, onceListener);
    };
    this.on(event, onceListener);
  }
  
  off(event, listener) {
    if (this.events.has(event)) {
      this.events.set(event, this.events.get(event).filter(l => l !== listener));
    }
  }
}

const asyncOperation = async (message) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Async operation completed: ${message}`), 1000);
  });
};

(async () => {
  const eventEmitter = new EventEmitter();
  
  const logMessage = (message) => print(`Log: ${message}`);
  const errorMessage = (message) => print(`Error: ${message}`);
  
  eventEmitter.on('log', logMessage);
  eventEmitter.once('error', errorMessage);
  
   
  eventEmitter.emit('log', 'This is a log message.');
  eventEmitter.emit('error', 'This is an error message.');
  
   
  eventEmitter.emit('error', 'This error will not be logged.');
  
   
  const module = await import('./asyncModule.js');
  const result = await asyncOperation(module.default.message);
  eventEmitter.emit('log', result);
  
  eventEmitter.off('log', logMessage);
  eventEmitter.emit('log', 'This log will not be displayed.');
})();

Note: The code assumes the presence of an `asyncModule.js` file exporting a default object with a `message` property. This setup demonstrates the use of classes, event handling, asynchronous operations, `async/await`, and dynamic imports.