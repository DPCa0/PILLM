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

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function* numberGenerator() {
  let i = 0;
  while (true) {
    await sleep(1000);
    yield i++;
  }
}

(async () => {
  const emitter = new EventEmitter();

  emitter.on('number', num => {
    print(`Received number: ${num}`);
  });

  for await (const num of numberGenerator()) {
    emitter.emit('number', num);
    if (num >= 5) break;  
  }
})();
