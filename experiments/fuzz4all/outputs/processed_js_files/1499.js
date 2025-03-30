class AsyncEventEmitter {
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
    return Promise.all(
      (this.events.get(event) || []).map(listener => listener(...args))
    );
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class UserData {
  #data = new Map();

  async set(key, value) {
     
    await delay(100);
    this.#data.set(key, value);
  }

  get(key) {
    return this.#data.get(key);
  }

  getAllKeys() {
    return Array.from(this.#data.keys());
  }
}

const eventEmitter = new AsyncEventEmitter();
const userData = new UserData();

eventEmitter.on('dataAdded', async (key, value) => {
  await userData.set(key, value);
  print(`Data added: ${key} = ${userData.get(key)}`);
});

eventEmitter.on('dataAdded', async (key) => {
  await delay(50);  
  print(`Current keys: ${userData.getAllKeys()}`);
});

(async () => {
  await eventEmitter.emit('dataAdded', 'name', 'Alice');
  await eventEmitter.emit('dataAdded', 'age', 30);
})();
