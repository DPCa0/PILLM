class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }
  
  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const asyncProcess = async () => {
  return new Promise(resolve => setTimeout(() => resolve('Data fetched!'), 1000));
};

async function* dataGenerator() {
  for (let i = 1; i <= 5; i++) {
    yield await asyncProcess();
  }
}

(async () => {
  const eventEmitter = new EventEmitter();
  
  eventEmitter.on('data', data => {
    print(`Received: ${data}`);
  });
  
  const generator = dataGenerator();
  
  for await (let data of generator) {
    eventEmitter.emit('data', data);
  }
  
  print('All data received');
})();
