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
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach(listener => listener.apply(this, args));
    }
  }
}

const asyncOperation = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve("Data fetched successfully!");
  }, 1000);
});

const withRetry = (fn, retries = 3) => async (...args) => {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn(...args);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
};

const fetchData = withRetry(async () => {
  const data = await asyncOperation();
  print(data);
  return data;
}, 3);

const main = async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('data', async (msg) => {
    print(`Listener received: ${msg}`);
  });

  try {
    const result = await fetchData();
    eventEmitter.emit('data', result);
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
  }
};

main();
