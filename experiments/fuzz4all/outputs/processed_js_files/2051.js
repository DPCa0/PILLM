class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

async function* dataStreamer(urls) {
  for (const url of urls) {
    yield await fetchData(url);
  }
}

const eventEmitter = new EventEmitter();
eventEmitter.on('data', data => print('Received data:', data));
eventEmitter.on('error', error => console.error('Error:', error));

(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];
  
  for await (const data of dataStreamer(urls)) {
    eventEmitter.emit('data', data);
    await delay(1000);
  }
})().catch(error => eventEmitter.emit('error', error));
