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
    }
  }
}

function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(`Data from ${url}`);
      } else {
        reject(`Error fetching data from ${url}`);
      }
    }, 1000);
  });
}

async function asyncHandler(url) {
  try {
    const data = await fetchData(url);
    print(data);
  } catch (error) {
    console.error(error);
  }
}

const emitter = new EventEmitter();

emitter.on('data', async (url) => {
  await asyncHandler(url);
});

emitter.emit('data', 'https://api.example.com/resource1');
emitter.emit('data', 'https://api.example.com/resource2');
