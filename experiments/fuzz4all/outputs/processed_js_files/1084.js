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

const fetchWithRetry = async (url, options = {}, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
    }
  }
};

class DataLoader {
  constructor(url) {
    this.url = url;
    this.events = new EventEmitter();
    this.data = null;
  }

  async loadData() {
    try {
      this.data = await fetchWithRetry(this.url);
      this.events.emit('dataLoaded', this.data);
    } catch (error) {
      this.events.emit('error', error);
    }
  }

  on(event, listener) {
    this.events.on(event, listener);
  }
}

const dataLoader = new DataLoader('https://api.example.com/data');

dataLoader.on('dataLoaded', (data) => {
  print('Data successfully loaded:', data);
});

dataLoader.on('error', (error) => {
  console.error('Error loading data:', error);
});

dataLoader.loadData();
