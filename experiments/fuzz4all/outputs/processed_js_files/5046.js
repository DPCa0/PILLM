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
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach(listener => listener(...args));
    }
  }

  off(event, listenerToRemove) {
    if (!this.events.has(event)) return;
    const listeners = this.events.get(event);
    this.events.set(event, listeners.filter(listener => listener !== listenerToRemove));
  }
}

const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const asyncOperation = async (data) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(`Processed: ${data}`), 1000);
  });
};

(async () => {
  const emitter = new EventEmitter();
  
  emitter.on('data', debounce(async (data) => {
    const result = await asyncOperation(data);
    print(result);
  }, 500));

  for (const data of ['Event 1', 'Event 2', 'Event 3']) {
    emitter.emit('data', data);
    await new Promise(resolve => setTimeout(resolve, 300));  
  }
})();
