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
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = data => {
  const parsedData = JSON.stringify(data, null, 2);
  print('Processed Data:', parsedData);
  return parsedData;
};

(async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('dataReceived', data => {
    const processed = processData(data);
    eventEmitter.emit('dataProcessed', processed);
  });

  eventEmitter.on('dataProcessed', processedData => {
    print('Data has been processed:', processedData);
  });

  try {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const data = await fetchData(url);
    eventEmitter.emit('dataReceived', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
