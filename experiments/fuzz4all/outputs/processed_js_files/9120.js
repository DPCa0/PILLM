class AsyncEventEmitter {
  #listeners = new Map();

  on(event, listener) {
    if (!this.#listeners.has(event)) this.#listeners.set(event, []);
    this.#listeners.get(event).push(listener);
  }

  emit(event, ...args) {
    if (!this.#listeners.has(event)) return;
    this.#listeners.get(event).forEach(listener => listener(...args));
  }

  async emitAsync(event, ...args) {
    if (!this.#listeners.has(event)) return;
    await Promise.all(this.#listeners.get(event).map(listener => listener(...args)));
  }
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async function() {
  const emitter = new AsyncEventEmitter();

  emitter.on('data', async (data) => {
    await sleep(1000);
    print(`Processed: ${data}`);
  });

  emitter.on('data', async (data) => {
    await sleep(500);
    print(`Logged: ${data}`);
  });

  print('Start processing...');
  await emitter.emitAsync('data', 'Sample Data 1');
  await emitter.emitAsync('data', 'Sample Data 2');
  print('All processing done.');
})();
