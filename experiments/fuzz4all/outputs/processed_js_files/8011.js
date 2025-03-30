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
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

(async () => {
  const emitter = new EventEmitter();

  emitter.on('dataFetched', data => {
    print('Data received:', data);
  });

  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  const data = await fetchData(url);
  if (data) {
    emitter.emit('dataFetched', data);
  }
})();
