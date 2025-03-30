class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = new Set();
    }
    this.events[event].add(listener);
  }

  off(event, listener) {
    if (this.events[event]) {
      this.events[event].delete(listener);
    }
  }

  emit(event, ...args) {
    if (this.events[event]) {
      for (const listener of this.events[event]) {
        listener(...args);
      }
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const runWithRetry = async (fn, retries = 3) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await delay(1000);
    return runWithRetry(fn, retries - 1);
  }
};

const dataStore = new Proxy({}, {
  get(target, prop) {
    print(`Getting property ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
});

const emitter = new EventEmitter();

const fetchData = async () => {
  print("Fetching data...");
  return { value: Math.random() };
};

emitter.on('dataFetched', data => {
  print('Data fetched:', data);
  dataStore.lastData = data;
});

(async () => {
  const data = await runWithRetry(fetchData);
  emitter.emit('dataFetched', data);
})();
