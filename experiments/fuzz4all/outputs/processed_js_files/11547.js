const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return;
    for (const listener of this.events.get(event)) {
      listener(...args);
    }
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }
}

const runComplexExample = async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  const eventEmitter = new EventEmitter();
  
  eventEmitter.on('dataFetched', data => {
    print('Data fetched successfully:', data);
  });

  eventEmitter.on('fetchFailed', error => {
    console.error('Error fetching data:', error);
  });

  const data = await fetchData(url);
  if (data) {
    eventEmitter.emit('dataFetched', data);
  } else {
    eventEmitter.emit('fetchFailed', new Error('No data returned'));
  }
};

runComplexExample();
