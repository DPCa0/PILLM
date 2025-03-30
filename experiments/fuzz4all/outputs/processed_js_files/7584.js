class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    (this.events[event] || (this.events[event] = [])).push(listener);
    return this;
  }

  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(l => l !== listener);
  }

  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(listener => listener(...args));
  }
}

function asyncOperation(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve('Success') : reject('Failure');
    }, duration);
  });
}

const eventEmitter = new EventEmitter();

eventEmitter.on('asyncComplete', message => print(`Operation completed: ${message}`));
eventEmitter.on('asyncError', error => print(`Operation failed: ${error}`));

(async () => {
  const tasks = Array.from({ length: 5 }, (_, i) => asyncOperation(1000 * i));
  for (const task of tasks) {
    try {
      const result = await task;
      eventEmitter.emit('asyncComplete', result);
    } catch (error) {
      eventEmitter.emit('asyncError', error);
    }
  }
})();

const proxy = new Proxy(eventEmitter, {
  get(target, prop, receiver) {
    if (prop === 'status') {
      return Object.keys(target.events).length > 0 ? 'Active' : 'Inactive';
    }
    return Reflect.get(...arguments);
  }
});

print(`Event Emitter Status: ${proxy.status}`);
