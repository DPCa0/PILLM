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

class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function* asyncGenerator(arr) {
  for (let item of arr) {
    yield new Promise(resolve => setTimeout(() => resolve(item), 100));
  }
}

(async () => {
  const emitter = new EventEmitter();
  const deferred = new Deferred();

  emitter.on('data', data => print('Received:', data));
  emitter.on('error', error => deferred.reject(error));
  emitter.on('done', () => deferred.resolve('All done'));

  try {
    const asyncGen = asyncGenerator([1, 2, 3, 4, 5]);

    for await (let value of asyncGen) {
      if (value === 4) {
        throw new Error('Oops! An error occurred.');
      }
      emitter.emit('data', value);
    }

    emitter.emit('done');
  } catch (error) {
    emitter.emit('error', error);
  }

  try {
    const result = await deferred.promise;
    print(result);
  } catch (error) {
    console.error('Error caught:', error);
  }
})();
