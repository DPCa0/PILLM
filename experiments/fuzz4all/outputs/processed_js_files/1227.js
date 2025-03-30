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
      for (const listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }
}

const asyncOperation = () => new Promise((resolve) => {
  setTimeout(() => resolve("Data Loaded"), 1000);
});

(async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('dataLoaded', (data) => {
    print(`First listener: ${data}`);
  });

  eventEmitter.on('dataLoaded', (data) => {
    print(`Second listener: ${data.toUpperCase()}`);
  });

  const fetchData = async () => {
    try {
      const data = await asyncOperation();
      eventEmitter.emit('dataLoaded', data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  await fetchData();
})();
