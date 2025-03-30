const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fetch error: ${error}`);
  }
};

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
    if (!this.events.has(event)) return;
    this.events.get(event).forEach((listener) => listener(...args));
  }
}

const mapAsync = async (array, callback) => {
  return Promise.all(array.map(callback));
};

(async () => {
  const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
  const emitter = new EventEmitter();

  emitter.on('dataProcessed', (processedData) => {
    print('Processed Data:', processedData);
  });

  const processedData = await mapAsync(data, async (item) => {
    const comments = await fetchData(`https: 
    return { ...item, comments };
  });

  emitter.emit('dataProcessed', processedData);
})();
