class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }

  async emit(event, ...args) {
    if (this.events.has(event)) {
      await Promise.all(this.events.get(event).map(async (listener) => {
        try {
          await listener(...args);
        } catch (error) {
          console.error(`Error in listener: ${error}`);
        }
      }));
    }
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const ee = new AsyncEventEmitter();

ee.on('data', async (data) => {
  await delay(1000);
  print(`Data processed: ${data}`);
});

ee.on('data', async (data) => {
  await delay(500);
  print(`Data received: ${data}`);
});

const fetchData = async () => {
  await delay(200);
  return 'Sample Data';
};

(async () => {
  print('Fetching data...');
  const data = await fetchData();
  print('Emitting event...');
  await ee.emit('data', data);
})();
