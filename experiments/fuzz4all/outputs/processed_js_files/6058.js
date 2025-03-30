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

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
  const eventEmitter = new EventEmitter();
  
  eventEmitter.on('dataFetched', (data) => {
    print('Data:', data);
  });

  eventEmitter.on('dataFetched', (data) => {
    print('Data length:', data.length);
  });

  const urls = [
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/comments'
  ];
  
  for (let url of urls) {
    const data = await fetchData(url);
    eventEmitter.emit('dataFetched', data);
    await delay(1000);
  }
};

main();
