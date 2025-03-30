class EventEmitter {
  #listeners = new Map();

  on(event, listener) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event).add(listener);
  }

  off(event, listener) {
    this.#listeners.get(event)?.delete(listener);
  }

  emit(event, ...args) {
    this.#listeners.get(event)?.forEach(listener => listener(...args));
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const events = new EventEmitter();
  const numbers = [1, 2, 3, 4, 5];
  const processedNumbers = [];

   
  events.on('process', async (number) => {
    await delay(100);
    processedNumbers.push(number * 2);
    if (processedNumbers.length === numbers.length) {
      events.emit('complete', processedNumbers);
    }
  });

   
  events.on('complete', (result) => {
    print('Processing Complete:', result);
  });

   
  numbers.forEach(number => events.emit('process', number));
})();
