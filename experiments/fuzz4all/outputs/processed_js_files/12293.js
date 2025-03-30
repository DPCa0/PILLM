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

  off(event, listenerToRemove) {
    if (this.events.has(event)) {
      this.events.set(event, this.events.get(event).filter(listener => listener !== listenerToRemove));
    }
  }
}

const asyncTask = async (eventEmitter) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      eventEmitter.emit('completed', 'Task Finished');
      resolve();
    }, 1000);
  });
};

(async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('completed', message => {
    print(`Event received: ${message}`);
  });

  await asyncTask(eventEmitter);

  eventEmitter.off('completed', message => {
    print(`Event received: ${message}`);
  });

  print('Task is complete!');
})();
