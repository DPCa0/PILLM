 

class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

const eventBus = new EventEmitter();
const dataUrl = 'https://jsonplaceholder.typicode.com/posts';

async function processData() {
  try {
    const data = await fetchData(dataUrl);
    eventBus.emit('dataReceived', data);
  } catch (error) {
    eventBus.emit('error', error);
  }
}

eventBus.on('dataReceived', (data) => {
  print('Data received:', data.slice(0, 5));  
});

eventBus.on('error', (error) => {
  console.error('An error occurred:', error);
});

processData();
