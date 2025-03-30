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
      for (let listener of this.events.get(event)) {
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

 
async function fetchData(url) {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'valid.url') resolve({ data: 'Hello, world!' });
      else reject(new Error('Invalid URL'));
    }, 1000);
  });
}

async function main() {
  const emitter = new EventEmitter();

   
  emitter.on('dataFetched', (data) => {
    print(`Data received: ${data}`);
  });

   
  try {
    const result = await fetchData('valid.url');
    emitter.emit('dataFetched', result.data);
  } catch (error) {
    console.error(error);
  }
}

main();
