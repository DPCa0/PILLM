(async () => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  const fetchData = async url => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

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
      this.events.get(event).forEach(listener => listener(...args));
    }
  }

  const emitter = new EventEmitter();

  emitter.on('dataReceived', data => {
    print('Data received:', data);
  });

  const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];

  const processUrls = async urls => {
    for await (const url of urls) {
      try {
        const data = await fetchData(url);
        emitter.emit('dataReceived', data);
        await sleep(1000);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
  };

  processUrls(urls);
})();
