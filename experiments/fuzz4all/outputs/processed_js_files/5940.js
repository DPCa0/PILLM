class EventEmitter {
  #events = new Map();

  on(event, listener) {
    if (!this.#events.has(event)) {
      this.#events.set(event, []);
    }
    this.#events.get(event).push(listener);
  }

  off(event, listener) {
    if (this.#events.has(event)) {
      this.#events.set(event, this.#events.get(event).filter(l => l !== listener));
    }
  }

  emit(event, ...args) {
    if (this.#events.has(event)) {
      this.#events.get(event).forEach(listener => listener(...args));
    }
  }
}

const asyncAdd = async (a, b) => {
  return new Promise(resolve => setTimeout(() => resolve(a + b), 100));
};

(async () => {
  const emitter = new EventEmitter();

  emitter.on('calculation', result => {
    print(`Calculation result: ${result}`);
  });

  try {
    const result1 = await asyncAdd(5, 10);
    emitter.emit('calculation', result1);
    
    const [result2, result3] = await Promise.all([
      asyncAdd(result1, 20),
      asyncAdd(15, 25)
    ]);

    emitter.emit('calculation', result2);
    emitter.emit('calculation', result3);
    
    const results = await Promise.allSettled([
      asyncAdd(result2, result3),
      asyncAdd(result1, 'oops')   
    ]);
    
    results.forEach(({ status, value, reason }) => {
      if (status === 'fulfilled') {
        emitter.emit('calculation', value);
      } else {
        console.error(`Error during calculation: ${reason}`);
      }
    });
  } catch (error) {
    console.error(`Caught error: ${error.message}`);
  }
})();
