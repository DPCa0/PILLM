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
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const asyncOperation = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Data fetched'), 1000);
  });
};

const processPipeline = async (data) => {
  let transformedData = await asyncOperation().then(res => `${data}, ${res}`);
  return transformedData.split(' ').map(word => word.toUpperCase()).join('_');
};

(async () => {
  const eventEmitter = new EventEmitter();
  
  const advancedProcessing = async (initialData) => {
    let result = await processPipeline(initialData);
    print(`Processed Result: ${result}`);
  };

  eventEmitter.on('data', advancedProcessing);

  const fetchData = async () => {
     
    const data = 'Hello, world';
    eventEmitter.emit('data', data);
  };

  await fetchData();
})();
