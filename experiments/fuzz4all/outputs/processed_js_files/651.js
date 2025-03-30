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

const asyncOperation = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve('Success') : reject('Failure');
    }, 1000);
  });
};

(async () => {
  const eventEmitter = new EventEmitter();

  const successListener = message => print(`Success listener: ${message}`);
  const failureListener = message => print(`Failure listener: ${message}`);

  eventEmitter.on('success', successListener);
  eventEmitter.on('failure', failureListener);

  try {
    const message = await asyncOperation();
    eventEmitter.emit('success', message);
  } catch (error) {
    eventEmitter.emit('failure', error);
  }

  eventEmitter.emit('success', 'This will not trigger a response.');
})();
