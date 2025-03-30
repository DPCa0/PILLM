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

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncWrapper = async (fn, ...args) => {
  print('Starting async task...');
  await delay(1000);
  return fn(...args);
};

const randomAsync = asyncWrapper(async number => {
  print(`Received: ${number}`);
  return number * Math.random();
});

(async () => {
  const eventEmitter = new EventEmitter();
  
  eventEmitter.on('random', result => {
    print(`Random result: ${result}`);
  });

  const number = Math.floor(Math.random() * 100);
  const result = await randomAsync(number);
  
  eventEmitter.emit('random', result);
})();
