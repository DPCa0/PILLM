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
      if (this.events.get(event).size === 0) {
        this.events.delete(event);
      }
    }
  }
}

const asyncOp = (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Operation finished after ${delay}ms`);
    }, delay);
  });
};

(async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('done', console.log);

  const delays = [1000, 2000, 3000];
  const promises = delays.map(delay => asyncOp(delay));

  const results = await Promise.allSettled(promises);
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      eventEmitter.emit('done', result.value);
    }
  });

  eventEmitter.off('done', console.log);
})();
