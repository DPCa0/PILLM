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

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.set(event, this.events.get(event).filter(l => l !== listener));
    }
  }
}

const asyncFetch = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

(async () => {
  const eventBus = new EventEmitter();
  const url = 'https://jsonplaceholder.typicode.com/posts/1';

  eventBus.on('dataFetched', (data) => {
    print('Data fetched successfully:', data);
  });

  eventBus.once('error', (error) => {
    console.error('An error occurred:', error);
  });

  try {
    const data = await asyncFetch(url);
    eventBus.emit('dataFetched', data);
  } catch (error) {
    eventBus.emit('error', error.message);
  }
})();
