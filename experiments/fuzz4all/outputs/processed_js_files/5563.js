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

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

(async () => {
  const eventEmitter = new EventEmitter();
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';

  eventEmitter.on('dataFetched', data => {
    print('Data received:', data);
  });

  eventEmitter.on('error', err => {
    console.error('Error:', err);
  });

  try {
    const data = await fetchData(apiUrl);
    eventEmitter.emit('dataFetched', data);
  } catch (error) {
    eventEmitter.emit('error', error);
  }

  await delay(2000);
  print('Delayed message after data fetch');
})();
