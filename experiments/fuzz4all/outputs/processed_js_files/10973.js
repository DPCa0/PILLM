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
      this.events.get(event).forEach(listener => listener.apply(this, args));
    }
  }
}

const emitter = new EventEmitter();

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncOperation() {
  print('Operation started');
  await delay(1000);
  print('Operation finished');
}

const asyncFnWithRetries = (fn, retries = 3) => {
  return async (...args) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await fn(...args);
        emitter.emit('success', 'Operation succeeded');
        return;
      } catch (error) {
        if (attempt === retries) {
          emitter.emit('failure', 'Operation failed');
        }
      }
    }
  };
};

emitter.on('success', (message) => {
  print(message);
});

emitter.on('failure', (message) => {
  console.error(message);
});

const operationWithRetries = asyncFnWithRetries(asyncOperation, 5);
operationWithRetries();
