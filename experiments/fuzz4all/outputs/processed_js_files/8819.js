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

const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const processData = ({ data }) => {
  return data.map(item => ({ ...item, processed: true }));
};

const pipeline = async (url) => {
  try {
    const rawData = await fetchData(url);
    const processedData = processData(rawData);
    eventEmitter.emit('dataProcessed', processedData);
  } catch (error) {
    eventEmitter.emit('error', error);
  }
};

const eventEmitter = new EventEmitter();

eventEmitter.on('dataProcessed', data => {
  print('Processed Data:', data);
});

eventEmitter.on('error', error => {
  console.error('An error occurred:', error);
});

 
 
