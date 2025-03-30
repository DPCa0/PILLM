class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      for (const listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
      if (this.events.get(event).size === 0) {
        this.events.delete(event);
      }
    }
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchData = async (url) => {
  await delay(1000);  
  return fetch(url).then(res => res.json());
};

async function* generateData(urls) {
  for (const url of urls) {
    yield await fetchData(url);
  }
}

const eventEmitter = new EventEmitter();
eventEmitter.on('data', (data) => {
  print('Data received:', data);
});

(async () => {
  const urls = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2'];
  for await (const data of generateData(urls)) {
    eventEmitter.emit('data', data);
  }
})();
