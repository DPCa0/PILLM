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
      for (const listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }
}

const asyncOperation = async (value) => {
  return new Promise((resolve) => setTimeout(() => resolve(value * 2), 1000));
};

const fetchData = async () => {
  const values = [1, 2, 3, 4];
  const results = await Promise.all(values.map(async (num) => await asyncOperation(num)));
  return results;
};

const execute = async () => {
  const emitter = new EventEmitter();

  emitter.on('dataReceived', (data) => {
    print('Data received:', data);
  });

  emitter.on('allProcessed', () => {
    print('All data processed.');
  });

  const data = await fetchData();
  emitter.emit('dataReceived', data);

  data.forEach((value) => {
    print(`Processing value: ${value}`);
  });

  emitter.emit('allProcessed');
};

execute();
