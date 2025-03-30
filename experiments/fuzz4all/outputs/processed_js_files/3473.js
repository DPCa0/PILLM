class AsyncEventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(event, listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(listener);
  }

  async emit(event, ...args) {
    if (this.listeners.has(event)) {
      const promises = this.listeners.get(event).map(listener => listener(...args));
      await Promise.all(promises);
    }
  }

  once(event, listener) {
    const onceWrapper = async (...args) => {
      await listener(...args);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }

  off(event, listener) {
    if (this.listeners.has(event)) {
      const updatedListeners = this.listeners.get(event).filter(l => l !== listener);
      if (updatedListeners.length > 0) {
        this.listeners.set(event, updatedListeners);
      } else {
        this.listeners.delete(event);
      }
    }
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const emitter = new AsyncEventEmitter();

emitter.on('data', async (data) => {
  print('Listener 1 received:', data);
});

emitter.once('data', async (data) => {
  print('Listener 2 received once:', data);
});

(async () => {
  const data = await fetchData('https://api.example.com/data');
  await emitter.emit('data', data);

  const moreData = await fetchData('https://api.example.com/moredata');
  await emitter.emit('data', moreData);
})();
