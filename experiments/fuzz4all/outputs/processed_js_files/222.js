class EventEmitter {
  #listeners = new Map();

  on(event, listener) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, []);
    }
    this.#listeners.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.#listeners.has(event)) {
      this.#listeners.get(event).forEach(listener => listener(...args));
    }
  }

  off(event, listener) {
    if (this.#listeners.has(event)) {
      const idx = this.#listeners.get(event).indexOf(listener);
      if (idx > -1) {
        this.#listeners.get(event).splice(idx, 1);
      }
    }
  }
}

const task = (async function*() {
  let count = 0;
  while (true) {
    yield new Promise(resolve => setTimeout(() => resolve(count++), 1000));
  }
})();

const emitter = new EventEmitter();
emitter.on('tick', value => print(`Tick: ${value}`));

(async function listenTicks() {
  for await (const tick of task) {
    emitter.emit('tick', tick);
    if (tick >= 5) break;
  }
})();
