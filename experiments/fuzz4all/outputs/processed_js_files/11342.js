class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
    return this;
  }

  async emit(event, ...args) {
    if (this.events.has(event)) {
      const listeners = this.events.get(event);
      for (let listener of listeners) {
        await listener(...args);
      }
    }
  }
}

const asyncEmitter = new AsyncEventEmitter();

async function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => resolve('Data loaded'), 1000);
  });
}

function createProxy(obj) {
  return new Proxy(obj, {
    get(target, prop) {
      if (prop in target) {
        print(`Accessing property: ${prop}`);
        return target[prop];
      } else {
        throw new Error(`Property ${prop} does not exist`);
      }
    }
  });
}

const dataStore = createProxy({
  data: null,
  status: 'idle'
});

asyncEmitter.on('dataLoaded', async (data) => {
  dataStore.data = data;
  dataStore.status = 'completed';
  print(`Status: ${dataStore.status}, Data: ${dataStore.data}`);
});

(async () => {
  dataStore.status = 'loading';
  print(`Status: ${dataStore.status}`);
  
  const data = await fetchData();
  asyncEmitter.emit('dataLoaded', data);
})();
