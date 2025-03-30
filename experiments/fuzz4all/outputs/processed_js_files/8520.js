class EventEmitter {
  #events = new Map();

  on(event, listener) {
    if (!this.#events.has(event)) {
      this.#events.set(event, []);
    }
    this.#events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.#events.has(event)) {
      this.#events.get(event).forEach(listener => listener(...args));
    }
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const processData = (data) => {
  print('Processing data:', data);
  return data.map(item => ({
    ...item,
    processed: true
  }));
};

const runComplexOperation = async (url) => {
  try {
    const eventEmitter = new EventEmitter();
    eventEmitter.on('dataProcessed', (data) => print('Data processed successfully:', data));

    const rawData = await fetchData(url);
    const processedData = processData(rawData);
    eventEmitter.emit('dataProcessed', processedData);
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

runComplexOperation('https://jsonplaceholder.typicode.com/posts');
