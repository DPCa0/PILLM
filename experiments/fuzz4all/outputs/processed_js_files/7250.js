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

const asyncFunction = async (time) => {
  return new Promise(resolve => setTimeout(resolve, time));
};

const advancedFeatureExample = async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('start', () => print('Process started.'));
  eventEmitter.on('data', data => print(`Received data: ${data}`));
  eventEmitter.on('end', () => print('Process ended.'));

  eventEmitter.emit('start');

  for (let i = 0; i < 5; i++) {
    await asyncFunction(500);
    eventEmitter.emit('data', `Data chunk ${i + 1}`);
  }

  eventEmitter.emit('end');
};

(async () => {
  try {
    await advancedFeatureExample();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
