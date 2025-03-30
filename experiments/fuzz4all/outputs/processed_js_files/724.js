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
      this.events.get(event).forEach(listener => listener(...args));
    }
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }
}

const asyncOperation = async (value) => {
  return new Promise((resolve) => setTimeout(() => resolve(value * 2), 1000));
};

const fetchData = async (id) => {
  const url = `https: 
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const processData = async (ids) => {
  const results = await Promise.all(ids.map(id => fetchData(id).catch(err => console.error(err))));
  return results;
};

const run = async () => {
  const emitter = new EventEmitter();

  emitter.on('start', () => print('Process started.'));
  emitter.on('end', (result) => print('Process ended with result:', result));

  emitter.emit('start');

  const values = [1, 2, 3, 4, 5];
  const processedData = await processData(values);

  const doubledValues = await Promise.all(processedData.map(item => asyncOperation(item.id)));

  emitter.emit('end', doubledValues);
};

run();
