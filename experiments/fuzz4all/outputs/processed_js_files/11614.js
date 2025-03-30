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

const asyncAdd = async (a, b) => {
  return new Promise(resolve => setTimeout(() => resolve(a + b), 1000));
};

const main = async () => {
  const emitter = new EventEmitter();
  
  emitter.on('data', async data => {
    try {
      const result = await asyncAdd(data, 10);
      print(`Computed result: ${result}`);
    } catch (error) {
      console.error('Error:', error);
    }
  });

  const dataArray = [1, 2, 3, 4, 5];
  dataArray.map(async (data, index) => {
    emitter.emit('data', data);
  });

  const promiseArray = dataArray.map(data => asyncAdd(data, 5));
  const results = await Promise.allSettled(promiseArray);

  print('All promises settled:', results);
};

main();
