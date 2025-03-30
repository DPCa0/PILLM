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

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
  return await response.json();
}

function processData(data) {
  return data.map(item => ({ ...item, processed: true }));
}

(async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('dataFetched', data => {
    print('Raw data:', data);
    const processedData = processData(data);
    print('Processed data:', processedData);
  });

  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos');
    eventEmitter.emit('dataFetched', data);
  } catch (error) {
    console.error(error.message);
  }
})();
