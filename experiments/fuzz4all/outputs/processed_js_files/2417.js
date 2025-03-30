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
  if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
  return response.json();
};

const processData = async (url, eventEmitter) => {
  try {
    const data = await fetchData(url);
    eventEmitter.emit('data', data);
  } catch (error) {
    eventEmitter.emit('error', error);
  }
};

const main = async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('data', data => {
    print('Data received:', data);
  });

  eventEmitter.on('error', error => {
    console.error('An error occurred:', error);
  });

  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
  ];

  await Promise.all(urls.map(url => processData(url, eventEmitter)));
};

main();
