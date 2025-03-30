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

const asyncOperation = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      print("Asynchronous Operation Completed");
      resolve("Data from async operation");
    }, 1000);
  });
};

(async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('data', data => {
    print('Data received:', data);
  });

  eventEmitter.on('complete', () => {
    print('All tasks complete!');
  });

  eventEmitter.emit('data', 'Initial data');

  try {
    const data = await asyncOperation();
    eventEmitter.emit('data', data);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    eventEmitter.emit('complete');
  }
})();
