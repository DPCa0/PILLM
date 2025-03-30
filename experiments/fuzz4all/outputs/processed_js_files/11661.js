class Emitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
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

const asyncOperation = async (data) => {
  return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
};

const complexComputation = async (arr) => {
  const results = await Promise.all(arr.map(async (num) => {
    const asyncData = await asyncOperation(num * 2);
    return asyncData * 10;
  }));

  return results.reduce((acc, val) => acc + val, 0);
};

const generatorFunction = function* (start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
};

(async () => {
  const emitter = new Emitter();
  emitter.on('dataReady', (data) => print('Data:', data));

  const nums = [...generatorFunction(1, 5)];
  const result = await complexComputation(nums);
  
  emitter.emit('dataReady', result);
})();
