class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }
  
  emit(event, ...args) {
    if (!this.events.has(event)) return;
    for (const listener of this.events.get(event)) {
      listener(...args);
    }
  }
}

async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

async function* generator(urls) {
  for (const url of urls) {
    yield await fetchData(url);
  }
}

const eventEmitter = new EventEmitter();

eventEmitter.on('dataReceived', data => {
  print('Data:', data);
});

eventEmitter.on('allDataReceived', () => {
  print('All data has been processed.');
});

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3',
];

(async () => {
  const gen = generator(urls);
  for await (const data of gen) {
    eventEmitter.emit('dataReceived', data);
  }
  eventEmitter.emit('allDataReceived');
})();
