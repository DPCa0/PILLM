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

const asyncWrapper = (fn) => (...args) => Promise.resolve(fn(...args));

const dataFetcher = asyncWrapper(async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
});

class App {
  static instance = null;
  
  static getInstance() {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }
  
  constructor() {
    if (App.instance) {
      return App.instance;
    }
    this.emitter = new EventEmitter();
  }
  
  async initialize(url) {
    try {
      const data = await dataFetcher(url);
      this.emitter.emit('dataReady', data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }
}

const app = App.getInstance();
app.emitter.on('dataReady', (data) => {
  print('Data received:', data);
});

const startApp = async () => {
  await app.initialize('https://api.example.com/data');
};

startApp();
