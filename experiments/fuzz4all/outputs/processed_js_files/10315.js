class EventEmitter {
  #events = new Map();

  on(event, listener) {
    if (!this.#events.has(event)) {
      this.#events.set(event, []);
    }
    this.#events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.#events.has(event)) {
      this.#events.get(event).forEach(listener => listener(...args));
    }
  }
}

const asyncDouble = async (num) => {
  const delay = Math.floor(Math.random() * 1000);
  return new Promise(resolve => setTimeout(() => resolve(num * 2), delay));
};

const processNumbers = async function* (numbers) {
  for (const number of numbers) {
    yield asyncDouble(number);
  }
};

const numbers = [1, 2, 3, 4, 5];
const emitter = new EventEmitter();
emitter.on('data', (data) => print('Processed:', data));
emitter.on('done', () => print('All numbers processed.'));

(async () => {
  for await (let doubled of processNumbers(numbers)) {
    emitter.emit('data', await doubled);
  }
  emitter.emit('done');
})();
