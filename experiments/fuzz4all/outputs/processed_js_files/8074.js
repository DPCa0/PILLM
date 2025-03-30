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
      for (const listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const emitter = new EventEmitter();
  
  const fetchData = async url => {
     
    await delay(1000);
    return { data: `Response from ${url}` };
  };

  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3',
  ];

  const fetchDataAndEmit = async url => {
    const result = await fetchData(url);
    emitter.emit('dataReceived', result.data);
  };

  const results = await Promise.all(urls.map(fetchDataAndEmit));

  emitter.on('dataReceived', data => {
    print(`Data received: ${data}`);
  });

  print('Fetching data...');
})();
