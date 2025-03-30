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
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach(listener => listener(...args));
    }
  }
}

class API {
  async fetchData(endpoint) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
}

async function* paginatedData(api, endpoint, pages) {
  for (let page = 1; page <= pages; page++) {
    const data = await api.fetchData(`${endpoint}?page=${page}`);
    yield data;
  }
}

const eventEmitter = new EventEmitter();

eventEmitter.on('data', data => {
  print('New data received:', data);
});

(async () => {
  const api = new API();
  const endpoint = 'https://jsonplaceholder.typicode.com/posts';

  try {
    for await (const data of paginatedData(api, endpoint, 3)) {
      eventEmitter.emit('data', data);
    }
  } catch (error) {
    console.error('Error during data processing:', error);
  }
})();
