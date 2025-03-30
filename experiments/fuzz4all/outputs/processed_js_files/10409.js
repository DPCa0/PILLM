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

const emitter = new EventEmitter();

 
const handler = {
  get(target, propKey) {
    const origMethod = target[propKey];
    return function (...args) {
      print(`${propKey} called with args:`, args);
      return origMethod.apply(this, args);
    };
  }
};

const proxiedEmitter = new Proxy(emitter, handler);

 
const asyncListener = async (message) => {
  const promise = new Promise(resolve => setTimeout(resolve, 1000));
  await promise;
  print(`Async message received: ${message}`);
};

proxiedEmitter.on('message', asyncListener);
proxiedEmitter.on('message', (message) => print(`Sync message received: ${message}`));

 
const messages = ['Hello,', 'world!'];
proxiedEmitter.emit('message', ...messages);

 
proxiedEmitter.off('message', asyncListener);
proxiedEmitter.emit('message', 'This will not be received asynchronously.');
