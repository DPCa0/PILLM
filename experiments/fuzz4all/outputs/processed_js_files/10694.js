const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
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
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const processData = async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const data = await fetchData(url);
  
  if (data) {
    const emitter = new EventEmitter();

    emitter.on('dataReceived', (item) => {
      print(`Title: ${item.title}`);
    });

    emitter.on('dataProcessed', (total) => {
      print(`Processed ${total} items.`);
    });

    let count = 0;
    for (const item of data) {
      emitter.emit('dataReceived', item);
      count++;
    }
    
    emitter.emit('dataProcessed', count);
  }
};

processData();
