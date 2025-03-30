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
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return response.json();
}

(async () => {
  const emitter = new EventEmitter();

   
  const dataPromise = fetchData('https://api.publicapis.org/entries');

  emitter.on('dataReceived', (data) => {
    print(`Data received: ${data.entries.length} entries.`);
  });

  emitter.on('error', (error) => {
    console.error('An error occurred:', error);
  });

  try {
    const data = await dataPromise;
    emitter.emit('dataReceived', data);
  } catch (error) {
    emitter.emit('error', error);
  }
})();
