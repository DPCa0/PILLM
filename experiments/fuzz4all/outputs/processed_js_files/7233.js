(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
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
  
  class AsyncDataFetcher {
    static #cache = new Map();
  
    static async fetch(url) {
      if (this.#cache.has(url)) {
        return this.#cache.get(url);
      } else {
        const response = await fetch(url);
        const data = await response.json();
        this.#cache.set(url, data);
        return data;
      }
    }
  }
  
  const emitter = new EventEmitter();
  
  emitter.on('data', data => {
    print('Received data:', data);
  });
  
  const processData = async (url) => {
    const data = await AsyncDataFetcher.fetch(url);
    emitter.emit('data', data);
  };
  
  print('Starting data fetch...');
  await delay(1000);  
  
  const apiUrls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];
  
  const dataPromises = apiUrls.map(url => processData(url));
  
  await Promise.all(dataPromises);
  print('Finished processing all data.');
})();
