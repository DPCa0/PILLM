const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(event, listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(listener);
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(listener => listener(data));
    }
  }
}

const processData = async (url) => {
  try {
    const data = await fetchData(url);
    console.groupCollapsed('Fetched Data');
    console.table(data);
    console.groupEnd();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const eventBus = new EventEmitter();

eventBus.on('dataProcessed', (data) => {
  print('Received processed data:', data);
});

(async () => {
  const apiURL = 'https://jsonplaceholder.typicode.com/posts';
  const data = await processData(apiURL);
  if (data) eventBus.emit('dataProcessed', data);
})();
