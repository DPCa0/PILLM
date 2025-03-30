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

const fetchData = async () => {
  const promise1 = new Promise((resolve) => setTimeout(() => resolve('Data from Promise 1'), 1000));
  const promise2 = new Promise((resolve) => setTimeout(() => resolve('Data from Promise 2'), 2000));
  const results = await Promise.all([promise1, promise2]);
  return results;
};

const runApp = async () => {
  const emitter = new EventEmitter();

  const delayLog = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        print(data);
        resolve();
      }, 1000);
    });
  };

  emitter.on('dataReceived', async (data) => {
    await delayLog(data);
  });

  try {
    const data = await fetchData();
    data.forEach(item => emitter.emit('dataReceived', item));
  } catch (error) {
    console.error('Error fetching data', error);
  }
};

runApp();
